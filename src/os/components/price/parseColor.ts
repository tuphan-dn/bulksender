export const parseColor = (priceChange: number | undefined = 0) => {
  if (!priceChange) return '#FFC580'
  if (priceChange < 0) return '#fa565c'
  if (priceChange > 0) return '#16FB48'
  return '#FFC580'
}
