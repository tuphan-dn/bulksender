import { ReactNode } from 'react'
import { Card } from 'antd'

export const DefaultCard = ({ children }: { children: ReactNode }) => {
  return <div style={{ width: '100%', height: '100%' }}>{children}</div>
}

export const SolidCard = ({ children }: { children: ReactNode }) => {
  return (
    <Card
      className="scrollbar"
      style={{ height: '100%' }}
      bodyStyle={{ padding: 16, height: '100%' }}
      bordered={false}
    >
      {children}
    </Card>
  )
}
