import { Space, Tag } from 'antd'

import { randomColor } from 'shared/util'

const AppTags = ({ tags = [] }: { tags?: string[] }) => {
  return (
    <Space size={8} wrap>
      {tags.map((tag, index) => (
        <Tag
          style={{ margin: 0, borderRadius: 4, color: randomColor(tag) }}
          color={randomColor(tag, 0.2)}
          key={index}
        >
          {tag}
        </Tag>
      ))}
    </Space>
  )
}

export default AppTags
