import { Space, Typography } from 'antd'
import Price, { PriceIndicator, PriceChange } from 'os/components/price'

const PriceInfo = () => {
  return (
    <Space size={4}>
      <Typography.Text>
        <PriceIndicator ticket="solana" colorized />
      </Typography.Text>
      <Typography.Text>
        <Price ticket="solana" colorized />
      </Typography.Text>
      <Typography.Text>
        <PriceChange ticket="solana" colorized />
      </Typography.Text>
    </Space>
  )
}

export default PriceInfo
