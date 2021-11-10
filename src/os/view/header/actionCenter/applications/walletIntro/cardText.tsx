import { ReactNode } from 'react'
import { Typography } from 'antd'
import { TextProps } from 'antd/lib/typography/Text'
import { TitleProps } from 'antd/lib/typography/Title'

const CardText = ({
  fontSize,
  color = '#fff',
  children,
  level,
  onClick,
  ...rest
}: TitleProps &
  TextProps & {
    fontSize?: number
    color?: string
    children?: ReactNode | string | number
    level?: number
    onClick?: () => void
  }) => {
  if (!level)
    return (
      <Typography.Text
        style={{
          fontSize: fontSize,
          color,
          cursor: onClick ? 'pointer' : 'default',
        }}
        onClick={onClick}
        {...rest}
      >
        {children}
      </Typography.Text>
    )
  return (
    <Typography.Title
      level={level}
      style={{
        fontWeight: 700,
        color,
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Typography.Title>
  )
}

export default CardText
