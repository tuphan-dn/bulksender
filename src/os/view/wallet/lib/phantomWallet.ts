import { Transaction } from '@solana/web3.js'
import * as nacl from 'tweetnacl'
import { account, Signature, SignedMessage } from '@senswap/sen-js'

import BaseWallet from './baseWallet'

class PhantomWallet extends BaseWallet {
  constructor() {
    super('Phantom')
  }

  getProvider = async () => {
    const { solana } = window
    if (!solana?.isPhantom) throw new Error('Wallet is not connected')
    if (solana.isConnected) return solana
    return await new Promise((resolve) => {
      solana.on('connect', () => resolve(solana))
      return solana.connect()
    })
  }

  getAddress = async () => {
    const provider = await this.getProvider()
    const address = provider.publicKey.toString()
    if (!account.isAddress(address))
      throw new Error('There is no Solana account')
    return address
  }

  rawSignTransaction = async (transaction: Transaction) => {
    const provider = await this.getProvider()
    const address = await this.getAddress()
    const publicKey = account.fromAddress(address)
    transaction.feePayer = publicKey
    const { signature } = await provider.signTransaction(transaction)
    return { publicKey, signature } as Signature
  }

  signMessage = async (message: string) => {
    if (!message) throw new Error('Message must be a non-empty string')
    const provider = await this.getProvider()
    const address = await this.getAddress()
    const encodedMsg = new TextEncoder().encode(message)
    const { signature: sig } = await provider.signMessage(encodedMsg, 'utf8')
    const signature = Buffer.from(sig).toString('hex')
    const data = { address, signature, message }
    return data as SignedMessage
  }

  verifySignature = async (
    signature: string,
    message: string,
    address?: string,
  ) => {
    address = address || (await this.getAddress())
    const publicKey = account.fromAddress(address)
    const bufSig = Buffer.from(signature, 'hex')
    const encodedMsg = new TextEncoder().encode(message)
    const valid = nacl.sign.detached.verify(
      encodedMsg,
      bufSig,
      publicKey.toBuffer(),
    )
    return valid
  }
}

export default PhantomWallet
