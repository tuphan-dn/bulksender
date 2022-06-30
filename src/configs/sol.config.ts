import { Net, rpc } from '@sentre/senhub'

/**
 * Contructor
 */
type Conf = {
  node: string
  spltAddress: string
  splataAddress: string
  bulksenderAddress: string
  fee: number
  taxman: string
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    node: rpc,
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    bulksenderAddress: 'FjkVzT6QJCQrgoZ8VoyAqysD5Mfa73ekpXWe9zDprWRA',
    fee: 1000000,
    taxman: '8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D',
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: rpc,
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    bulksenderAddress: '',
    fee: 1000000,
    taxman: '',
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: rpc,
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    bulksenderAddress: '8WB9yeJ946594RHtxdNoKbwC2y13yCwJCtSY1mAeLWu1',
    fee: 1000000,
    taxman: '9doo2HZQEmh2NgfT3Yx12M89aoBheycYqH1eaR5gKb3e',
  },
}

/**
 * Module exports
 */
export default conf
