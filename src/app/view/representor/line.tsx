import { useDispatch, useSelector } from 'react-redux'
import { account, utils } from '@senswap/sen-js'

import { Row, Col, Button, Typography, Tooltip, Divider, Space } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { MintSymbol } from 'shared/antd/mint'

import { AppDispatch, AppState } from 'app/model'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { setData } from 'app/model/main.controller'
import { toBigInt } from 'app/lib/utils'

export type LineProps = {
  index: number
  accountAddress: string
  amount: string
}

const Line = ({ index, accountAddress, amount }: LineProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: AppState) => state.main.data)
  const mintAddress = useSelector((state: AppState) => state.main.mintAddress)
  const decimals = useMintDecimals(mintAddress) || 0

  const remove = (index: number) => {
    const nextData = [...data]
    nextData.splice(index, 1)
    return dispatch(setData(nextData))
  }

  const error = !account.isAddress(accountAddress)
    ? 'Invalid address'
    : !toBigInt(amount)
    ? 'Invalid amount'
    : ''
  const duplicatedIndex = data
    .slice(0, index)
    .findIndex(([address]) => address === accountAddress)
  const warning =
    duplicatedIndex >= 0 ? `Duplicated address to #${duplicatedIndex}` : ''

  const display = !toBigInt(amount)
    ? amount
    : utils.undecimalize(toBigInt(amount), decimals)

  return (
    <Row gutter={[16, 8]}>
      <Col span={24}>
        <Row gutter={[16, 8]} align="middle" wrap={false}>
          <Col>
            <Typography.Text type="secondary">#{index + 1}</Typography.Text>
          </Col>
          <Col span={12}>
            <Tooltip title={accountAddress}>
              <Typography.Text ellipsis>{accountAddress}</Typography.Text>
            </Tooltip>
          </Col>
          <Col flex="auto">
            <Space>
              <Typography.Text>{display}</Typography.Text>
              <Typography.Text>
                <MintSymbol mintAddress={mintAddress} />
              </Typography.Text>
            </Space>
          </Col>
          <Col>
            <Space align="center">
              {warning ? (
                <Tooltip title={warning}>
                  <IonIcon
                    name="alert-circle-outline"
                    style={{ color: '#FCB017' }}
                  />
                </Tooltip>
              ) : null}
              {error ? (
                <Tooltip title={error}>
                  <IonIcon
                    name="warning-outline"
                    style={{ color: '#F2323F' }}
                  />
                </Tooltip>
              ) : null}
              <Button
                type="text"
                icon={<IonIcon name="trash-outline" />}
                onClick={() => remove(index)}
              />
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Divider style={{ margin: 0 }} />
      </Col>
    </Row>
  )
}

export default Line
