import { Transaction } from '@solana/web3.js'
import {
  WalletInterface,
  Provider,
  Signature,
  SignedMessage,
} from '@senswap/sen-js'

import storage from 'shared/storage'

class BaseWallet implements WalletInterface {
  readonly walletType: string

  constructor(walletType: string) {
    this.walletType = walletType
    storage.set('WalletType', this.walletType)
  }

  getProvider = async (): Promise<Provider> => {
    throw new Error('Wallet is not connected')
  }

  getAddress = async (): Promise<string> => {
    throw new Error('Wallet is not connected')
  }

  signTransaction = async (transaction: Transaction): Promise<Transaction> => {
    const { signature, publicKey } = await this.rawSignTransaction(transaction)
    transaction.addSignature(publicKey, signature)
    return transaction
  }

  rawSignTransaction = async (transaction: Transaction): Promise<Signature> => {
    throw new Error('Wallet is not connected')
  }

  signMessage = async (message: string): Promise<SignedMessage> => {
    throw new Error('Wallet is not connected')
  }

  verifySignature = async (
    signature: string,
    message: string,
    address?: string,
  ): Promise<boolean> => {
    throw new Error('Wallet is not connected')
  }

  disconnect = async (): Promise<void> => {
    storage.clear('WalletType')
    const provider = await this.getProvider()
    provider.disconnect()
  }
}

export default BaseWallet
