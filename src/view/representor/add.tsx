import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account, utils } from '@senswap/sen-js'

import { Row, Col, Button, Input, InputNumber } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { AppDispatch, AppState } from 'model'
import { setData } from 'model/main.controller'
import useMintDecimals from 'shared/hooks/useMintDecimals'

const Add = () => {
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const data = useSelector((state: AppState) => state.main.data)
  const mintAddress = useSelector((state: AppState) => state.main.mintAddress)
  const decimals = useMintDecimals(mintAddress) || 0
  const dispatch = useDispatch<AppDispatch>()

  const onAddress = (e: ChangeEvent<HTMLInputElement>) =>
    setAddress(e.target.value || '')
  const onAmount = (val: string) => setAmount(val)

  const ok = useMemo(() => {
    if (!account.isAddress(address) || !Number(amount)) return false
    return true
  }, [address, amount])

  const add = useCallback(async () => {
    if (!account.isAddress(address))
      return window.notify({ type: 'warning', description: 'Invalid address' })
    if (!Number(amount))
      return window.notify({ type: 'warning', description: 'Invalid amount' })
    const nextData = [...data]
    nextData.push([address, utils.decimalize(amount, decimals).toString()])
    await dispatch(setData(nextData))
    await setAddress('')
    await setAmount('')
  }, [address, amount, data, decimals, dispatch])

  return (
    <Row gutter={[16, 8]} align="middle" wrap={false}>
      <Col span={12}>
        <Input placeholder="Address" value={address} onChange={onAddress} />
      </Col>
      <Col flex="auto">
        <InputNumber
          placeholder="Amount"
          value={amount}
          onChange={onAmount}
          stringMode
          type="number"
          controls={false}
          style={{ width: '100%' }}
        />
      </Col>
      <Col>
        <Button
          type="primary"
          icon={<IonIcon name="add-outline" />}
          onClick={add}
          disabled={!ok}
        />
      </Col>
    </Row>
  )
}

export default Add
