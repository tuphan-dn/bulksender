import { Net, rpc } from 'shared/runtime'

/**
 * Contructor
 */
type Conf = {
  node: string
  spltAddress: string
  splataAddress: string
  bulksenderAddress: string
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
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: rpc,
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    bulksenderAddress: '',
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: rpc,
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    bulksenderAddress: '8WB9yeJ946594RHtxdNoKbwC2y13yCwJCtSY1mAeLWu1',
  },
}

/**
 * Module exports
 */
export default conf
