export const parseColor = (priceChange: number | undefined = 0) => {
  if (!priceChange) return '#fcb017'
  if (priceChange < 0) return '#f2323f'
  if (priceChange > 0) return '#3DBA4E'
  return '#fcb017'
}
