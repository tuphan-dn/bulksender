import { Card, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintName } from 'shared/antd/mint'

import { randomColor } from 'shared/util'

export type MintTagProps = {
  mintAddress: string
  onClick?: (mintAddress: string) => void
  active?: boolean
}

const MintTag = ({
  mintAddress,
  onClick = () => {},
  active = false,
}: MintTagProps) => {
  return (
    <Card
      bodyStyle={{ padding: 8, cursor: 'pointer' }}
      style={{ backgroundColor: randomColor(mintAddress, 0.2) }}
      bordered={Boolean(active)}
      onClick={() => onClick(mintAddress)}
    >
      <Space>
        <MintAvatar mintAddress={mintAddress} />
        <Space>
          <Typography.Text style={{ color: randomColor(mintAddress) }}>
            <MintName mintAddress={mintAddress} />
          </Typography.Text>
          {active ? <IonIcon name="checkmark-outline" /> : null}
        </Space>
      </Space>
    </Card>
  )
}
export default MintTag
