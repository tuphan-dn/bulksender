import { PoolData, utils } from '@senswap/sen-js'
import configs from 'os/configs'
import TokenProvider from 'os/providers/tokenProvider'
import store from 'os/store'

import { DataLoader } from './dataloader'

const SEN_TICKET = 'sen'
const TOKEN_PROVIDER = new TokenProvider()

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
    sol: { senPoolAddress, senAddress },
  } = configs
  const senInfo = {
    icon: '',
    symbol: 'SEN',
    name: 'Sen',
    address: senAddress,
    rank: 0,
    price: 0,
    priceChange: 0,
    totalVolume: 0,
  }
  const poolData = store.getState().pools[senPoolAddress]
  if (!poolData) return senInfo

  const { mint_a, mint_b } = poolData
  const usdcAddress = senAddress === mint_a ? mint_b : mint_a
  const [usdcTokenInfo, senTokenInfo] = await Promise.all(
    [usdcAddress, senAddress].map((addr) => TOKEN_PROVIDER.findByAddress(addr)),
  )
  if (!usdcTokenInfo || !senTokenInfo) return senInfo

  const usdcReserve = extractReserve(usdcAddress, poolData)
  const senReserve = extractReserve(senAddress, poolData)
  senInfo.price =
    Number(utils.undecimalize(usdcReserve, usdcTokenInfo.decimals)) /
    Number(utils.undecimalize(senReserve, senTokenInfo.decimals))

  return senInfo
}

export const fetchCGK = async (ticket = '') => {
  if (ticket === SEN_TICKET) return calcSenPrice()

  return DataLoader.load('fetchCGK' + ticket, () => utils.parseCGK(ticket))
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
