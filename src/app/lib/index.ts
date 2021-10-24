import {
  PublicKey,
  Transaction,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
  SystemProgram,
} from '@solana/web3.js'
import { SPLT, account, WalletInterface } from '@senswap/sen-js'

import Tx from './tx'

const soproxABI = require('soprox-abi')

const ErrorMapping = [
  'Invalid instruction',
  'Incorrect program id',
  'Operation overflowed',
  'Invalid owner',
]

class Bulksender extends Tx {
  readonly bulksenderProgramId: PublicKey
  readonly spltProgramId: PublicKey
  readonly splataProgramId: PublicKey
  private _splt: SPLT

  constructor(
    bulksenderProgramAddress: string,
    spltProgramAddress: string,
    splataProgramAddress: string,
    nodeUrl: string,
  ) {
    super(nodeUrl, ErrorMapping)

    if (!account.isAddress(bulksenderProgramAddress))
      throw new Error('Invalid bulksender program address')
    if (!account.isAddress(spltProgramAddress))
      throw new Error('Invalid SPL token program address')
    if (!account.isAddress(splataProgramAddress))
      throw new Error('Invalid SPL associated token program address')
    this.bulksenderProgramId = account.fromAddress(bulksenderProgramAddress)
    this.spltProgramId = account.fromAddress(spltProgramAddress)
    this.splataProgramId = account.fromAddress(splataProgramAddress)

    this._splt = new SPLT(spltProgramAddress, splataProgramAddress, nodeUrl)
  }

  /**
   * Simulate a transaction
   * @param transaction
   * @returns
   */
  private simulateTransaction = async (
    transaction: Transaction,
  ): Promise<boolean> => {
    const {
      value: { err },
    } = await this.connection.simulateTransaction(transaction)
    if (
      err &&
      (err as any).InstructionError &&
      ((err as any).InstructionError[1] === 'ProgramFailedToComplete' ||
        (err as any).InstructionError[1] === 'ComputationalBudgetExceeded')
    )
      return false
    return true
  }

  /**
   * Checked transfer
   * @param amount Number of tokens
   * @param dstAddress Destination address (wallet address)
   * @param mintAddress Mint Address
   * @param wallet
   * @returns Transaction id
   */
  checkedTransfer = async (
    amount: bigint,
    dstAddress: string,
    mintAddress: string,
    wallet: WalletInterface,
  ): Promise<{
    txId: string
  }> => {
    // Validation
    if (!account.isAddress(dstAddress))
      throw new Error('Invalid destination address')
    if (!account.isAddress(mintAddress)) throw new Error('Invalid mint address')
    // Get payer
    const payerAddress = await wallet.getAddress()
    const payerPublicKey = account.fromAddress(payerAddress)
    // Fetch necessary info
    const srcAssociatedAddress = await this._splt.deriveAssociatedAddress(
      payerAddress,
      mintAddress,
    )
    const dstAssociatedAddress = await this._splt.deriveAssociatedAddress(
      dstAddress,
      mintAddress,
    )
    // Build public keys
    const srcAssociatedPublicKey = account.fromAddress(srcAssociatedAddress)
    const dstPublicKey = account.fromAddress(dstAddress)
    const dstAssociatedPublicKey = account.fromAddress(dstAssociatedAddress)
    const mintPublicKey = account.fromAddress(mintAddress)
    // Build tx
    let transaction = new Transaction()
    transaction = await this.addRecentCommitment(transaction)
    const layout = new soproxABI.struct(
      [
        { key: 'code', type: 'u8' },
        { key: 'amount', type: 'u64' },
      ],
      { code: 0, amount },
    )
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: payerPublicKey, isSigner: true, isWritable: true },
        { pubkey: srcAssociatedPublicKey, isSigner: false, isWritable: true },
        { pubkey: dstPublicKey, isSigner: false, isWritable: false },
        { pubkey: dstAssociatedPublicKey, isSigner: false, isWritable: true },
        { pubkey: mintPublicKey, isSigner: false, isWritable: false },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: this.spltProgramId, isSigner: false, isWritable: false },
        { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
        { pubkey: this.splataProgramId, isSigner: false, isWritable: false },
      ],
      programId: this.bulksenderProgramId,
      data: layout.toBuffer(),
    })
    transaction.add(instruction)
    transaction.feePayer = payerPublicKey
    // Sign tx
    const payerSig = await wallet.rawSignTransaction(transaction)
    this.addSignature(transaction, payerSig)
    // Send tx
    const txId = await this.sendTransaction(transaction)
    return { txId }
  }

  /**
   * Build checkedBulkTransfer transaction
   * @param amounts
   * @param dstAddresses
   * @param mintAddress
   * @param wallet
   * @returns
   */
  private buildCheckedBulkTransferTransaction = async (
    amounts: bigint[],
    dstAddresses: string[],
    mintAddress: string,
    wallet: WalletInterface,
  ): Promise<Transaction> => {
    // Validation
    for (const dstAddress of dstAddresses) {
      if (!account.isAddress(dstAddress))
        throw new Error(`Invalid destination address: ${dstAddress}`)
    }
    for (const amount of amounts) {
      if (!amount) throw new Error(`Invalid amount: ${amount}`)
    }
    if (!account.isAddress(mintAddress)) throw new Error('Invalid mint address')
    if (amounts.length !== dstAddresses.length)
      throw new Error(
        `The number of amounts and the number of addresses are unmatcher (${amounts.length}, ${dstAddresses.length})`,
      )
    // Get payer
    const payerAddress = await wallet.getAddress()
    const payerPublicKey = account.fromAddress(payerAddress)
    // Fetch necessary info
    const srcAssociatedAddress = await this._splt.deriveAssociatedAddress(
      payerAddress,
      mintAddress,
    )
    // Build public keys
    const srcAssociatedPublicKey = account.fromAddress(srcAssociatedAddress)
    const mintPublicKey = account.fromAddress(mintAddress)
    // Build tx
    let transaction = new Transaction()
    transaction = await this.addRecentCommitment(transaction)
    const layout = new soproxABI.struct(
      [
        { key: 'code', type: 'u8' },
        { key: 'num_txs', type: 'u32' },
        { key: 'amounts', type: `[u64;${amounts.length}]` },
      ],
      { code: 1, num_txs: amounts.length, amounts },
    )
    let keys = [
      { pubkey: payerPublicKey, isSigner: true, isWritable: true },
      { pubkey: srcAssociatedPublicKey, isSigner: false, isWritable: true },
      { pubkey: mintPublicKey, isSigner: false, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      { pubkey: this.spltProgramId, isSigner: false, isWritable: false },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
      { pubkey: this.splataProgramId, isSigner: false, isWritable: false },
    ]
    for (const dstAddress of dstAddresses) {
      const dstAssociatedAddress = await this._splt.deriveAssociatedAddress(
        dstAddress,
        mintAddress,
      )
      const dstPublicKey = account.fromAddress(dstAddress)
      const dstAssociatedPublicKey = account.fromAddress(dstAssociatedAddress)
      keys.push({ pubkey: dstPublicKey, isSigner: false, isWritable: false })
      keys.push({
        pubkey: dstAssociatedPublicKey,
        isSigner: false,
        isWritable: true,
      })
    }
    const instruction = new TransactionInstruction({
      keys,
      programId: this.bulksenderProgramId,
      data: layout.toBuffer(),
    })
    transaction.add(instruction)
    transaction.feePayer = payerPublicKey
    return transaction
  }

  /**
   * Checked bulk transfer
   * @param amounts Number of tokens
   * @param dstAddresses Destination address (wallet address)
   * @param mintAddress Mint Address
   * @param wallet
   * @returns Transaction id
   */
  simulateBulkTransfer = async (
    amounts: bigint[],
    dstAddresses: string[],
    mintAddress: string,
    wallet: WalletInterface,
  ): Promise<boolean> => {
    // Build transaction
    const transaction = await this.buildCheckedBulkTransferTransaction(
      amounts,
      dstAddresses,
      mintAddress,
      wallet,
    )
    // Simulate the transaction
    return await this.simulateTransaction(transaction)
  }

  /**
   * Checked bulk transfer
   * @param amounts Number of tokens
   * @param dstAddresses Destination address (wallet address)
   * @param mintAddress Mint Address
   * @param wallet
   * @returns Transaction id
   */
  checkedBulkTransfer = async (
    amounts: bigint[],
    dstAddresses: string[],
    mintAddress: string,
    wallet: WalletInterface,
  ): Promise<{
    txId: string
  }> => {
    // Build transaction
    const transaction = await this.buildCheckedBulkTransferTransaction(
      amounts,
      dstAddresses,
      mintAddress,
      wallet,
    )
    // Sign tx
    const payerSig = await wallet.rawSignTransaction(transaction)
    this.addSignature(transaction, payerSig)
    // Send tx
    const txId = await this.sendTransaction(transaction)
    return { txId }
  }
}

export default Bulksender
