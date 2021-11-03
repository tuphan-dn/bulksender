import { ReactNode } from 'react'
import { Card } from 'antd'

export const DefaultCard = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="scrollbar"
      style={{ width: '100%', height: '100%', padding: 16 }}
    >
      {children}
    </div>
  )
}

export const SolidCard = ({ children }: { children: ReactNode }) => {
  return (
    <Card
      style={{
        background: '#FFFFFF',
        boxShadow: '0px 1px 3px rgba(33, 36, 51, 0.16)',
        height: '100%',
      }}
      bodyStyle={{ padding: 16, height: '100%' }}
      bordered={false}
    >
      {children}
    </Card>
  )
}
