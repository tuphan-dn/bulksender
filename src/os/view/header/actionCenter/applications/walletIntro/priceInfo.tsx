import { Space, Typography } from 'antd'
import Price, { PriceIndicator, PriceChange } from 'os/components/price'

const PriceInfo = () => {
  return (
    <Space size={6}>
      <Typography.Text>
        <PriceIndicator className="price-arrow" ticket="solana" colorized />
      </Typography.Text>
      <Typography.Text>
        <PriceChange ticket="solana" colorized />
      </Typography.Text>
      <Typography.Text className="balance">
        <Price ticket="solana" />
      </Typography.Text>
    </Space>
  )
}

export default PriceInfo
