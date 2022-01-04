import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account, utils } from '@senswap/sen-js'

import { Row, Col, Button, Input } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import NumericInput from 'shared/antd/numericInput'

import { AppDispatch, AppState } from 'app/model'
import { setData } from 'app/model/main.controller'
import useMintDecimals from 'shared/hooks/useMintDecimals'

const Add = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const {
    main: { data, mintAddress },
  } = useSelector((state: AppState) => state)
  const decimals = useMintDecimals(mintAddress) || 0

  const onAddress = (e: ChangeEvent<HTMLInputElement>) =>
    setAddress(e.target.value)
  const onAmount = (val: string) => setAmount(val)

  const add = async () => {
    if (!account.isAddress(address))
      return window.notify({ type: 'warning', description: 'Invalid address' })
    if (!Number(amount))
      return window.notify({ type: 'warning', description: 'Invalid amount' })
    const nextData = [...data]
    nextData.push([address, utils.decimalize(amount, decimals).toString()])
    await dispatch(setData(nextData))
    await setAddress('')
    await setAmount('')
  }

  return (
    <Row gutter={[16, 8]} align="middle" wrap={false}>
      <Col span={12}>
        <Input placeholder="Address" value={address} onChange={onAddress} />
      </Col>
      <Col flex="auto">
        <NumericInput placeholder="Amount" value={amount} onValue={onAmount} />
      </Col>
      <Col>
        <Button
          type="primary"
          icon={<IonIcon name="add-outline" />}
          onClick={add}
          disabled={!account.isAddress(mintAddress)}
        />
      </Col>
    </Row>
  )
}

export default Add
