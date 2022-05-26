import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWallet } from '@senhub/providers'

import { Row, Col, Typography, Button, Space } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { AppDispatch, AppState } from 'app/model'
import { increaseCounter } from 'app/model/main.controller'
import configs from 'app/configs'
import { createPDB } from 'shared/pdb'
import { MintSelection } from 'shared/antd/mint'

const {
  manifest: { appId },
} = configs

const View = () => {
  const {
    wallet: { address },
  } = useWallet()
  const dispatch = useDispatch<AppDispatch>()
  const { counter } = useSelector((state: AppState) => state.main)
  const [mintAddress, setMintAddress] = useState(
    '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ',
  )

  const pdb = useMemo(() => createPDB(address, appId), [address])
  const increase = useCallback(() => dispatch(increaseCounter()), [dispatch])
  useEffect(() => {
    if (pdb) pdb.setItem('counter', counter)
  }, [pdb, counter])

  return (
    <Row gutter={[24, 24]} align="middle">
      <Col span={24}>
        <Space align="center">
          <IonIcon name="newspaper-outline" />
          <Typography.Title level={4}>App View</Typography.Title>
        </Space>
      </Col>
      <Col span={24}>
        <Typography.Text>Address: {address}</Typography.Text>
      </Col>
      <Col>
        <Typography.Text>Counter: {counter}</Typography.Text>
      </Col>
      <Col>
        <Button onClick={increase}>Increase</Button>
      </Col>
      <MintSelection value={mintAddress} onChange={setMintAddress} />
    </Row>
  )
}

export default View
