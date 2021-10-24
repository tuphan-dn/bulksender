import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account, AccountData, utils } from '@senswap/sen-js'
import { useAccount, useWallet, useMint } from 'senhub/providers'
import numbro from 'numbro'

import { Row, Col, Select, Space, Typography, Card } from 'antd'
import { MintAvatar, MintName, MintSymbol } from 'app/components/mint'

import { AppState } from 'app/model'
import { setMintAddress } from 'app/model/main.controller'

const MintSelection = () => {
  const dispatch = useDispatch()
  const [balance, setBalance] = useState('0')
  const { mintAddress } = useSelector((state: AppState) => state.main)
  const { accounts } = useAccount() as {
    accounts: { [key: string]: AccountData }
  }
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const { getMint } = useMint()

  const getBalance = useCallback(async () => {
    if (!account.isAddress(mintAddress) || !account.isAddress(walletAddress))
      return setBalance('0')
    const {
      senos: { splt },
    } = window
    const {
      [mintAddress]: { decimals },
    } = await getMint({ address: mintAddress })
    const accountAddress = await splt.deriveAssociatedAddress(
      walletAddress,
      mintAddress,
    )
    const { amount } = accounts[accountAddress] || { amount: BigInt(0) }
    const balance = utils.undecimalize(amount, decimals)
    return setBalance(balance)
  }, [mintAddress, walletAddress, getMint])

  useEffect(() => {
    getBalance()
  }, [getBalance])

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Select
            size="large"
            placeholder="Select token"
            style={{ width: '100%' }}
            onChange={(mintAddress) =>
              dispatch(setMintAddress(mintAddress as string))
            }
          >
            {Object.values(accounts).map(({ mint: mintAddress }, i) => (
              <Select.Option key={mintAddress + i} value={mintAddress}>
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
              {numbro(balance || 0).format('0,0.[0000]')}
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
