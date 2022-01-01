import { Space, Typography } from 'antd'

const ExtraTypography = ({
  label,
  title,
}: {
  label: string
  title?: string
}) => {
  return (
    <Space>
      <Typography.Text type="secondary">{label}:</Typography.Text>
      <Typography.Text>{title}</Typography.Text>
    </Space>
  )
}

export type AppAuthorProps = {
  author?: { name?: string; email?: string }
}

const AppAuthor = ({ author }: AppAuthorProps) => {
  const { name, email } = author || {}

  return (
    <Space direction="vertical" size={4}>
      <ExtraTypography label="Author" title={name} />
      <ExtraTypography label="Support" title={email} />
    </Space>
  )
}

export default AppAuthor
