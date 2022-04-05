import { Transaction } from '@solana/web3.js'
import { Provider } from '@senswap/sen-js'

import BaseWallet from './baseWallet'

export const GUEST_ADDRESS = 'GuestAccount11111111111111111111111111111111'

type ExpanedProvider = Provider & { address: string }

class GuestWallet extends BaseWallet {
  constructor(callback: () => void = () => {}) {
    super('Guest')

    this._callback = callback
  }

  private _callback = () => {}
  private _error = () => {
    throw new Error(
      'You are in the Guest Mode. Please connect your personal wallet to proceed the action.',
    )
  }

  getProvider = async (): Promise<ExpanedProvider> => {
    const provider = {
      address: GUEST_ADDRESS,
      disconnect: () => {},
    }
    return provider
  }

  getAddress = async () => {
    const { address } = await this.getProvider()
    return address
  }

  rawSignTransaction = async (transaction: Transaction) => {
    await this._callback()
    return this._error()
  }

  signMessage = async (message: string) => {
    await this._callback()
    return this._error()
  }

  verifySignature = async (
    signature: string,
    message: string,
    address?: string,
  ) => {
    await this._callback()
    return this._error()
  }
}

export default GuestWallet
