import { Button, Space, Tooltip, Typography } from 'antd'

import { ReactNode } from 'react'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar } from 'shared/antd/mint'

const CardContent = ({
  label = '',
  tooltip,
  value = '',
  mintAddress,
}: {
  label?: string
  tooltip?: ReactNode
  value?: string
  mintAddress?: string
}) => {
  return (
    <Space direction="vertical" size={4}>
      <Space size={4}>
        <Typography.Text type="secondary">{label}</Typography.Text>
        {tooltip && (
          <Tooltip title={tooltip}>
            <Button
              type="text"
              shape="circle"
              size="small"
              icon={
                <Typography.Text type="secondary">
                  <IonIcon name="information-circle-outline" />
                </Typography.Text>
              }
            />
          </Tooltip>
        )}
      </Space>
      <Space size={4}>
        <Typography.Title level={5}>{value}</Typography.Title>
        <div style={{ marginTop: -3 }}>
          {mintAddress && <MintAvatar mintAddress={mintAddress} size={18} />}
        </div>
      </Space>
    </Space>
  )
}

export default CardContent
