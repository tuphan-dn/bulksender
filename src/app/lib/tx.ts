import { Signature } from '@senswap/sen-js'
import { Connection, Transaction } from '@solana/web3.js'

export class TxError extends Error {
  info: { txId: string }

  constructor(msg: string, txId: string = '') {
    super(msg)

    this.name = `Error: ${msg}`
    this.info = { txId }
  }
}

class Tx {
  nodeUrl: string
  connection: Connection
  errorMapping: string[]

  constructor(nodeUrl: string, errorMapping: string[] = []) {
    this.nodeUrl = nodeUrl
    this.errorMapping = errorMapping
    this.connection = new Connection(this.nodeUrl, 'confirmed')
  }

  /**
   * Build programmable error
   * The method's precision os very relative, it's will parse wrong error in case of invoking programs
   * @param er
   * @param txId
   * @returns
   */
  private throwError = (er: any, txId: string) => {
    const defaultError = 'Transaction failed'
    if (!er) throw new TxError(defaultError, txId)
    const instructionError = er.InstructionError || []
    if (typeof instructionError[1] == 'string')
      throw new TxError(instructionError[1], txId)
    const { Custom } = instructionError[1] || {}
    if (typeof Custom !== 'number') throw new TxError(defaultError, txId)
    throw new TxError(this.errorMapping[Custom] || defaultError, txId)
  }

  /**
   * Broadcast a transaction to clusters and return the txId when it's confirmed
   * @param transaction Signed transaction
   * @returns transaction id
   */
  protected sendTransaction = async (
    transaction: Transaction,
  ): Promise<string> => {
    const tx = transaction.serialize()
    const txId = await this.connection.sendRawTransaction(tx, {
      skipPreflight: true,
      preflightCommitment: 'confirmed',
    })
    const {
      value: { err },
    } = await this.connection.confirmTransaction(txId, 'confirmed')
    if (err) return this.throwError(err, txId)
    return txId
  }

  /**
   * Add transaction commitment
   * @param transaction
   * @returns transaction with added commitment
   */
  protected addRecentCommitment = async (
    transaction: Transaction,
  ): Promise<Transaction> => {
    const { blockhash } = await this.connection.getRecentBlockhash('confirmed')
    transaction.recentBlockhash = blockhash
    return transaction
  }

  /**
   * Add transaction signature
   * @param transaction
   * @param { publicKey, signature } signature
   * @returns transaction with added signature
   */
  protected addSignature = (
    transaction: Transaction,
    { publicKey, signature }: Signature,
  ): Transaction => {
    if (!transaction.feePayer) transaction.feePayer = publicKey
    transaction.addSignature(publicKey, signature)
    return transaction
  }
}

export default Tx
