import { Card, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar } from 'shared/antd/mint'
import MintSymbol from '../mintSymbol'

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
      style={{
        borderRadius: 8,
      }}
      bordered={Boolean(active)}
      onClick={() => onClick(mintAddress)}
    >
      <Space>
        <MintAvatar mintAddress={mintAddress} />
        <Typography.Text>
          <MintSymbol mintAddress={mintAddress} />
        </Typography.Text>
        {active && <IonIcon name="checkmark-outline" />}
      </Space>
    </Card>
  )
}
export default MintTag
