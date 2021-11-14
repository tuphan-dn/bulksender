import { useCallback, useEffect, useState } from 'react'

import { fetchCGK } from 'shared/helper'
import { numeric } from 'shared/util'
import { parseColor } from './parseColor'

const Price = ({
  ticket,
  colorized = false,
}: {
  ticket: string
  colorized?: boolean
}) => {
  const [cgkData, setCGKData] = useState<CgkData>()

  const getCGKData = useCallback(async () => {
    const cgkData = await fetchCGK(ticket)
    return setCGKData(cgkData)
  }, [ticket])

  useEffect(() => {
    getCGKData()
  }, [getCGKData])

  const color = parseColor(cgkData?.priceChange)
  return (
    <span style={{ color: colorized ? color : 'inherit' }}>
      ${numeric(cgkData?.price).format('0,0.[00]')}
    </span>
  )
}

export default Price
export { default as PriceChange } from './priceChange'
export { default as PriceIndicator } from './priceIndicator'
