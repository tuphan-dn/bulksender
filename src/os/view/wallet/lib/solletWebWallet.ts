import { Transaction } from '@solana/web3.js'
import * as nacl from 'tweetnacl'
import { account, Provider, Signature, SignedMessage } from '@senswap/sen-js'
import WalletAdapter from '@project-serum/sol-wallet-adapter'

import BaseWallet from './baseWallet'
import configs from 'os/configs'

const PROVIDER_URL = 'https://www.sollet.io'

class SolletWallet extends BaseWallet {
  private provider: WalletAdapter & Provider

  constructor() {
    super('SolletWeb')

    const {
      sol: { node },
    } = configs
    this.provider = new WalletAdapter(PROVIDER_URL, node)
  }

  getProvider = async () => {
    if (!this.provider.connected) await this.provider.connect()
    return this.provider
  }

  getAddress = async () => {
    const provider = await this.getProvider()
    if (!provider.publicKey) throw new Error('Cannot connect to Sollet Web')
    return provider.publicKey.toBase58()
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
    const { signature: sig } = await provider.sign(encodedMsg, 'utf8')
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

export default SolletWallet
