import { Typography, Space } from 'antd'
import { BaseType } from 'antd/lib/typography/Base'
import numbro from 'numbro'
import IonIcon from 'shared/ionicon'

const arrow = (priceChange: number) => {
  let arrow: { type: BaseType; name: string } = {
    type: 'success',
    name: 'arrow-up-outline',
  }
  if (priceChange < 0) arrow = { type: 'danger', name: 'arrow-down-outline' }
  if (priceChange === 0) arrow = { type: 'warning', name: 'remove-circle' }
  const style = arrow.type === 'danger' ? { color: '#F9575E' } : {}
  return (
    <Typography.Text type={arrow.type} style={style}>
      <IonIcon name={arrow.name} />
    </Typography.Text>
  )
}

const percentage = ({
  price = 0,
  priceChange = 0,
}: {
  price: number
  priceChange: number
}) => {
  let type: BaseType = 'success'
  if (priceChange < 0) type = 'danger'
  if (priceChange === 0) type = 'warning'

  const style = type === 'danger' ? { color: '#F9575E' } : {}
  return (
    <Typography.Text type={type} style={style}>
      ${numbro(price).format('0,0.[00]')}/
      {numbro(Math.abs(priceChange)).format('0.[0]')}%
    </Typography.Text>
  )
}

const PriceChange = ({
  price,
  priceChange,
}: {
  price: number
  priceChange: number
}) => {
  return (
    <Space size={4}>
      {arrow(priceChange)}
      {percentage({ price, priceChange })}
    </Space>
  )
}

export default PriceChange
