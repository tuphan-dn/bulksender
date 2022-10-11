import { useDispatch, useSelector } from 'react-redux'
import { useAccounts, util } from '@sentre/senhub'

import { Row, Col, Select, Space, Typography, Card } from 'antd'
import { MintAvatar, MintName, MintSymbol } from '@sen-use/app'

import { AppState } from 'model'
import { setMintAddress } from 'model/main.controller'
import { useAccountBalanceByMintAddress } from 'hooks/useAccountBalance'

const MintSelection = () => {
  const dispatch = useDispatch()
  const mintAddress = useSelector((state: AppState) => state.main.mintAddress)
  const accounts = useAccounts()
  const { balance } = useAccountBalanceByMintAddress(mintAddress)

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Select
            size="large"
            placeholder="Select token"
            style={{ width: '100%' }}
            onChange={(mintAddress: string) =>
              dispatch(setMintAddress(mintAddress))
            }
          >
            {Object.values(accounts).map(({ mint: mintAddress }, i) => (
              <Select.Option key={i} value={mintAddress}>
                <Space align="center">
                  <MintAvatar mintAddress={mintAddress} />
                  <Typography.Text type="secondary">
                    <MintSymbol mintAddress={mintAddress} />
                  </Typography.Text>
                  <Typography.Text>
                    <MintName mintAddress={mintAddress} />
                  </Typography.Text>
                </Space>
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={24}>
          <Space>
            <Typography.Text type="secondary">Balance:</Typography.Text>
            <Typography.Text>
              {util.numeric(balance).format('0,0.[0000]')}
            </Typography.Text>
            <Typography.Text>
              <MintSymbol mintAddress={mintAddress} />
            </Typography.Text>
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default MintSelection
