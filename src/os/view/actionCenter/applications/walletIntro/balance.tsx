import { useCallback, useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'

import { Skeleton } from 'antd'

import { RootState } from 'os/store'
import { fetchCGK } from 'shared/helper'
import { numeric } from 'shared/util'

const Balance = ({
  hidden = false,
  inUSD = false,
}: {
  hidden?: boolean
  inUSD?: boolean
}) => {
  const [cgkData, setCGKData] = useState<CgkData>()
  const { lamports } = useSelector((state: RootState) => state.wallet)

  const balance = numeric(utils.undecimalize(lamports, 9)).format('0.[000]')
  const usd = useMemo(() => {
    return numeric(Number(balance) * (cgkData?.price || 0)).format('0,0.[000]')
  }, [balance, cgkData])

  const getCGKData = useCallback(async () => {
    const cgkData = await fetchCGK('solana')
    return setCGKData(cgkData)
  }, [])
  useEffect(() => {
    getCGKData()
  }, [getCGKData])

  if (inUSD)
    return hidden ? (
      <Skeleton.Input
        style={{ width: 128, borderRadius: 4 }}
        size="small"
        active
      />
    ) : (
      <span>{`$${usd}`}</span>
    )
  return hidden ? (
    <Skeleton.Input
      style={{ width: 56, borderRadius: 4 }}
      size="small"
      active
    />
  ) : (
    <span>{balance}</span>
  )
}

export default Balance
