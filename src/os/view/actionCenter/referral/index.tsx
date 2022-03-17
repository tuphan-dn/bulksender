import { useCallback, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'

import { Col, Divider, Row, Space, Typography } from 'antd'
import EnterReferral from './enterReferral'
import ShareReferral from './shareReferral'
import GuideReferral from './guideReferral'
import YourReferral from './yourReferral'
import ConfirmSuccess from './confirmSuccess'

import configs from 'os/configs'
import {
  RootDispatch,
  RootState,
  useRootDispatch,
  useRootSelector,
} from 'os/store'
import { getReferrer, setReferrer } from 'os/helpers/utils'
import { setWalkthrough } from 'os/store/walkthrough.reducer'

const {
  referral: { base },
} = configs

const Referral = () => {
  const [visible, setVisible] = useState(false)
  const {
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)
  const [referrerAddress, setReferrerAddress] = useState('')
  const dispatch = useRootDispatch<RootDispatch>()

  const loadReferrerAddress = useCallback(async () => {
    if (!account.isAddress(walletAddress)) return setReferrerAddress('')
    // Referrer existed
    const currentReferrerAddress = await getReferrer(walletAddress)
    if (!account.isAddress(currentReferrerAddress))
      return setReferrerAddress('')
    return setReferrerAddress(currentReferrerAddress)
  }, [walletAddress])

  const onConfirm = useCallback(
    async (link) => {
      await dispatch(setWalkthrough({ run: false }))
      try {
        if (!link.startsWith(base)) throw new Error('Broken invitation link')
        const params = new URLSearchParams(new URL(link).search)
        const referrerAddress = params.get('referrer') || ''
        await setReferrer(walletAddress, referrerAddress)
        await loadReferrerAddress()
        setVisible(true)
      } catch (er: any) {
        return window.notify({ type: 'warning', description: er.message })
      }
    },
    [dispatch, walletAddress, loadReferrerAddress],
  )

  useEffect(() => {
    loadReferrerAddress()
  }, [loadReferrerAddress])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Typography.Text>Your invitation link</Typography.Text>
          </Col>
          <Col span={24}>
            <YourReferral />
          </Col>
          <Col span={24}>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Send this link to friends or
            </Typography.Text>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Space direction="vertical">
          <Typography.Text>Share</Typography.Text>
          <ShareReferral />
        </Space>
      </Col>
      <Col span={24}>
        <Divider style={{ margin: 0 }} />
      </Col>
      <Col span={24}>
        <EnterReferral
          referrerAddress={referrerAddress}
          onConfirm={onConfirm}
        />
      </Col>
      <Col span={24}>
        <GuideReferral referrerAddress={referrerAddress} />
      </Col>
      <ConfirmSuccess visible={visible} onCancel={() => setVisible(false)} />
    </Row>
  )
}
export default Referral
