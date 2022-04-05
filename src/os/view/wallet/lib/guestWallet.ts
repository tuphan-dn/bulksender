import { Transaction } from '@solana/web3.js'
import { Provider } from '@senswap/sen-js'

import BaseWallet from './baseWallet'
import session from 'shared/session'

export const GUEST_ADDRESS = 'GuestAccount11111111111111111111111111111111'

type ExpanedProvider = Provider & { address: string }

class GuestWallet extends BaseWallet {
  constructor(callback: () => void = () => {}) {
    super('Guest')

    this._callback = callback
  }

  private _callback = () => {}
  private error = () => {
    throw new Error(
      'You are in the Guest Mode. Please connect your real wallet to proceed the action.',
    )
  }

  getProvider = async (): Promise<ExpanedProvider> => {
    const provider = {
      address: GUEST_ADDRESS,
      disconnect: () => session.clear('Guest'),
    }
    return provider
  }

  getAddress = async () => {
    const { address } = await this.getProvider()
    return address
  }

  rawSignTransaction = async (transaction: Transaction) => {
    await this._callback()
    return this.error()
  }

  signMessage = async (message: string) => {
    await this._callback()
    return this.error()
  }

  verifySignature = async (
    signature: string,
    message: string,
    address?: string,
  ) => {
    await this._callback()
    return this.error()
  }
}

export default GuestWallet
