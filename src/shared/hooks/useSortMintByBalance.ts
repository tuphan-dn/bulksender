import { useCallback } from 'react'

import { useAccount, useMint, useWallet } from '@senhub/providers'
import { utils } from '@senswap/sen-js'

const useSortMintByBalance = () => {
  const { accounts } = useAccount()
  const { getDecimals } = useMint()
  const {
    wallet: { address },
  } = useWallet()

  const {
    sentre: { splt },
  } = window

  const sortMintsByBalances = useCallback(
    async (mintAddresses: string[]) => {
      const mintInfo = await Promise.all(
        mintAddresses.map(async (mint) => {
          try {
            const decimal = await getDecimals(mint)
            const associatedAddress = await splt.deriveAssociatedAddress(
              address,
              mint,
            )

            return {
              address: mint,
              value: !decimal
                ? 0
                : Number(
                    utils.undecimalize(
                      accounts[associatedAddress]
                        ? accounts[associatedAddress].amount
                        : BigInt(0),
                      decimal,
                    ),
                  ),
            }
          } catch {
            return {
              address: mint,
              value: 0,
            }
          }
        }),
      )

      const sortedMintInfo = mintInfo
        .sort((a, b) => {
          return b.value - a.value
        })
        .map((value) => value.address)

      return sortedMintInfo
    },
    [accounts, address, getDecimals, splt],
  )

  return sortMintsByBalances
}

export default useSortMintByBalance
