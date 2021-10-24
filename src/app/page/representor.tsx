import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import numbro from 'numbro'

import {
  Row,
  Col,
  Card,
  Button,
  Typography,
  Tooltip,
  Divider,
  Space,
} from 'antd'
import IonIcon from 'components/ionicon'

import { setData } from 'app/model/main.controller'
import { AppState } from 'app/model'
import { toBigInt } from 'helpers/util'

const Line = ({
  index,
  address,
  amount,
  onClick = () => {},
  warning = '',
  error = '',
}: {
  index: number
  address: string
  amount: string
  onClick: (index: number) => void
  warning?: string
  error?: string
}) => {
  return (
    <Row gutter={[16, 8]}>
      <Col span={24}>
        <Row gutter={[16, 8]} align="middle" wrap={false}>
          <Col>
            <Typography.Text type="secondary">#{index + 1}</Typography.Text>
          </Col>
          <Col span={12}>
            <Tooltip title={address}>
              <Typography.Text ellipsis>{address}</Typography.Text>
            </Tooltip>
          </Col>
          <Col flex="auto">
            <Typography.Text>
              {!toBigInt(amount) ? amount : numbro(amount).format('0,0')}
            </Typography.Text>
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
                onClick={() => onClick(index)}
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

const Representor = () => {
  const dispatch = useDispatch()
  const { data } = useSelector((state: AppState) => state.main)

  const remove = (index: number) => {
    const nextData = [...data]
    nextData.splice(index, 1)
    return dispatch(setData(nextData))
  }

  return (
    <Card
      bodyStyle={{
        padding: 16,
        cursor: 'pointer',
        height: 228,
        overflow: 'auto',
      }}
      hoverable
    >
      <Row gutter={[8, 8]}>
        {!data.length ? (
          <Col span={24}>
            <Typography.Text type="secondary">No Data</Typography.Text>
          </Col>
        ) : null}
        {data.map(([address, amount], i) => {
          const error = !account.isAddress(address)
            ? 'Invalid address'
            : !toBigInt(amount)
            ? 'Invalid amount'
            : ''
          const duplicatedIndex = data
            .slice(0, i)
            .findIndex(([addr]) => addr === address)
          const warning =
            duplicatedIndex >= 0
              ? `Duplicated address to #${duplicatedIndex}`
              : ''
          return (
            <Col key={address + i} span={24}>
              <Line
                index={i}
                address={address}
                amount={amount}
                onClick={remove}
                error={error}
                warning={warning}
              />
            </Col>
          )
        })}
      </Row>
    </Card>
  )
}

export default Representor
