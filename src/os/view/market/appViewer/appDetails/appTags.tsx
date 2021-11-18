import { Space, Tag } from 'antd'

const TAG_COLOR: Record<string, string> = {
  'liquidity pool': '#D72311',
  blockchian: '#16FB48',
  trending: '#FFC580',
}

const AppTags = () => {
  return (
    <Space size={8} wrap>
      {['liquidity pool', 'blockchian', 'trending'].map((tag, index) => (
        <Tag
          style={{ margin: 0, borderRadius: 4 }}
          color={TAG_COLOR[tag]}
          key={index}
        >
          {tag}
        </Tag>
      ))}
    </Space>
  )
}
export default AppTags
