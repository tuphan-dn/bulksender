import { Transaction, Keypair } from '@solana/web3.js'
import * as nacl from 'tweetnacl'
import { account, Provider, Signature } from '@senswap/sen-js'

import BaseWallet from './baseWallet'
import session from 'shared/session'

type ExpanedProvider = Provider & { keypair: Keypair }

class SecretKeyWallet extends BaseWallet {
  constructor(secretKey: string) {
    super('SecretKey')

    this._setSecretKey(secretKey)
  }

  private _setSecretKey = (secretKey: string): void => {
    if (!secretKey) throw new Error('Invalid secret key')
    session.set('SecretKey', secretKey)
  }

  getProvider = async (): Promise<ExpanedProvider> => {
    const secretKey = session.get('SecretKey')
    const keypair = account.fromSecretKey(secretKey)
    if (!keypair) throw new Error('Cannot get the keystore-based provider')
    const provider = {
      keypair,
      disconnect: () => session.clear('SecretKey'),
    }
    return provider
  }

  getAddress = async () => {
    const { keypair } = await this.getProvider()
    return keypair.publicKey.toBase58()
  }

  rawSignTransaction = async (transaction: Transaction) => {
    const confirmed = window.confirm('Please confirm to sign the transaction!')
    if (!confirmed) throw new Error('User rejects to sign the transaction')
    const { keypair } = await this.getProvider()
    const signData = transaction.serializeMessage()
    const publicKey = keypair.publicKey
    const signature = nacl.sign.detached(signData, keypair.secretKey)
    return { publicKey, signature } as Signature
  }

  signMessage = async (message: string) => {
    if (!message) throw new Error('Message must be a non-empty string')
    const confirmed = window.confirm(
      `Please confirm to sign the message! Message: ${message}`,
    )
    if (!confirmed) throw new Error('User rejects to sign the message')
    const { keypair } = await this.getProvider()
    const secretKey = Buffer.from(keypair.secretKey).toString('hex')
    const data = account.signMessage(message, secretKey)
    return { ...data }
  }

  verifySignature = async (
    signature: string,
    message: string,
    address?: string,
  ) => {
    address = address || (await this.getAddress())
    const valid = account.verifySignature(address, signature, message)
    return valid as boolean
  }
}

export default SecretKeyWallet
