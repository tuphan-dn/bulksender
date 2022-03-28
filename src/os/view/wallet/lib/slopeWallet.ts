import { Transaction, PublicKey } from '@solana/web3.js'
import * as nacl from 'tweetnacl'
import { account, Signature } from '@senswap/sen-js'
import { decode, encode } from 'bs58'

import BaseWallet from './baseWallet'

class SlopeWallet extends BaseWallet {
  private provider: any
  constructor() {
    super('Slope')
    this.provider = null
  }

  getProvider = async () => {
    const { Slope } = window || {}
    if (!Slope) throw new Error('Cannot connect to Slope')
    if (this.provider) return this.provider
    this.provider = new Slope()
    await this.provider.connect()
    return this.provider
  }

  getAddress = async () => {
    const provider = await this.getProvider()
    const { data } = await provider.connect()
    if (!data.publicKey) throw new Error('Wallet is not connected')
    return data.publicKey
  }

  rawSignTransaction = async (transaction: Transaction) => {
    const provider = await this.getProvider()
    const message = encode(transaction.serializeMessage())
    const { msg, data } = await provider.signTransaction(message)

    if (!data.publicKey) throw new Error(msg)
    const publicKey = new PublicKey(data.publicKey)
    const signature = decode(data.signature)

    return { publicKey, signature } as Signature
  }

  verifySignature = async (
    signature: string,
    message: string,
    address?: string,
  ) => {
    const slopeAddress = address || (await this.getAddress())
    const publicKey = account.fromAddress(slopeAddress)
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

export default SlopeWallet
