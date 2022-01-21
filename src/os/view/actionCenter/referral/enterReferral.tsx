import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Button, Col, Input, Row, Typography, Space } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ConfirmSuccessFully from './confirmSuccess'

import configs from 'os/configs'
import {
  RootDispatch,
  RootState,
  useRootDispatch,
  useRootSelector,
} from 'os/store'
import { shortenAddress, explorer } from 'shared/util'
import { getReferrer, setReferrer } from 'os/helpers/utils'
import PDB from 'shared/pdb'
import { setWalkthrough } from 'os/store/walkthrough.reducer'

const {
  referral: { base },
} = configs

const EnterReferral = () => {
  const dispatch = useRootDispatch<RootDispatch>()
  const {
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)
  const [referrerAddress, setReferrerAddress] = useState('')
  const [value, setValue] = useState('')
  const [visible, setVisible] = useState(false)
  const { search } = useLocation()

  const loadReferrerAddress = useCallback(async () => {
    if (!account.isAddress(walletAddress)) return setReferrerAddress('')
    // Referrer existed
    const currentReferrerAddress = await getReferrer(walletAddress)
    if (account.isAddress(currentReferrerAddress))
      return setReferrerAddress(currentReferrerAddress)
    setReferrerAddress('')
    // Parse referrer address from url
    const query = new URLSearchParams(search)
    const referrerAddress = query.get('referral') || ''
    if (account.isAddress(referrerAddress))
      return setValue(base + referrerAddress)
  }, [search, walletAddress])

  // For testing only
  const removeReferrerAddress = useCallback(async () => {
    if (!account.isAddress(walletAddress)) return
    const db = new PDB(walletAddress).createInstance('sentre')
    db.removeItem('referrerAddress')
    return loadReferrerAddress()
  }, [walletAddress, loadReferrerAddress])

  const validLink = account.isAddress(referrerAddress)

  const onConfirm = useCallback(async () => {
    try {
      if (!value.startsWith(base)) throw new Error('Broken referral link')
      const params = new URLSearchParams(new URL(value).search)
      const referrerAddress = params.get('referral') || ''
      await setReferrer(walletAddress, referrerAddress)
      setVisible(true)
      await loadReferrerAddress()
      return dispatch(setWalkthrough({ run: false }))
    } catch (er: any) {
      return window.notify({ type: 'warning', description: er.message })
    }
  }, [dispatch, value, walletAddress, loadReferrerAddress])

  useEffect(() => {
    loadReferrerAddress()
  }, [loadReferrerAddress])

  return (
    <Row gutter={[12, 12]}>
      <Col flex="auto">
        <Input
          size="large"
          placeholder="Referral link"
          value={validLink ? base + referrerAddress : value}
          onChange={(e) => setValue(e.target.value)}
          readOnly={validLink}
        />
      </Col>
      <Col>
        <Button
          id="button-confirm-referral"
          type="primary"
          size="large"
          onClick={onConfirm}
          disabled={validLink}
          block
        >
          Confirm
        </Button>
      </Col>
      <Col span={24} style={{ fontSize: 12 }}>
        {!validLink ? (
          <Typography.Text type="secondary">
            Enter the referral link to receive the reward for both.
          </Typography.Text>
        ) : (
          <Space size={4}>
            <IonIcon name="close" onClick={removeReferrerAddress} />
            <Typography.Text type="secondary">
              You was invited by
            </Typography.Text>
            <Typography.Text
              style={{ cursor: 'pointer' }}
              onClick={() => window.open(explorer(referrerAddress), '_blank')}
            >
              {shortenAddress(referrerAddress)} <IonIcon name="open-outline" />
            </Typography.Text>
          </Space>
        )}
      </Col>
      <ConfirmSuccessFully
        visible={visible}
        onCancel={() => setVisible(false)}
      />
    </Row>
  )
}
export default EnterReferral
