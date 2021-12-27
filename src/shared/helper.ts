import { PoolData, utils } from '@senswap/sen-js'

import configs from 'os/configs'
import { DataLoader } from './dataloader'

const SEN_TICKET = 'sentre'

/**
 * Extract reserve from pool data
 */
const extractReserve = (mintAddress: string, poolData: PoolData): bigint => {
  const { mint_a, mint_b, reserve_a, reserve_b } = poolData
  if (mintAddress === mint_a) return reserve_a
  if (mintAddress === mint_b) return reserve_b
  return BigInt(0)
}

const calcSenPrice = async () => {
  const {
    sol: { sntrPoolAddress, sntrAddress },
  } = configs
  const senInfo = {
    icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M/logo.png',
    symbol: 'SNTR',
    name: 'Sentre',
    address: sntrAddress,
    rank: 0,
    price: 0,
    priceChange: 0,
    totalVolume: 0,
  }
  try {
    const poolData = await window.sentre?.swap?.getPoolData(sntrPoolAddress)
    const { mint_a, mint_b } = poolData
    const usdcAddress = sntrAddress === mint_a ? mint_b : mint_a
    const usdcReserve = extractReserve(usdcAddress, poolData)
    const senReserve = extractReserve(sntrAddress, poolData)
    senInfo.price =
      Number(utils.undecimalize(usdcReserve, 9)) /
      Number(utils.undecimalize(senReserve, 9))
    return senInfo
  } catch (er) {
    return senInfo
  }
}

export const fetchCGK = async (ticket = '') => {
  return DataLoader.load(
    'fetchCGK' + ticket,
    ticket === SEN_TICKET ? calcSenPrice : () => utils.parseCGK(ticket),
  )
}

export const randomColor = (seed?: string, opacity?: string | number) => {
  let hash = Math.floor(Math.random() * 16777215)
  if (seed) {
    hash = 0
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash)
    }
  }
  var rgb = [0, 0, 0]
  for (let i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 255
    rgb[i] = value
  }
  return `rgba(${rgb[0]}, 100, ${rgb[1]},${opacity || 1})`
}
