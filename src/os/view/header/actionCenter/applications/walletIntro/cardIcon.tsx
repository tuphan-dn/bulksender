import { ReactNode } from 'react'
import { Typography } from 'antd'
import IonIcon from 'shared/ionicon'

const CardIcon = ({
  name,
  color = '#BEC4EC',
  onClick,
  children,
}: {
  name: string
  color?: string
  onClick?: () => void
  children?: ReactNode
}) => {
  return (
    <Typography.Text
      type="secondary"
      onClick={onClick}
      style={{ cursor: 'pointer', color }}
    >
      <IonIcon name={name} style={{ marginRight: children ? 6 : 0 }} />
      {children}
    </Typography.Text>
  )
}

export default CardIcon
