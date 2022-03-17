import { useCallback } from 'react'

import { Button, Col, Image, Modal, Row, Space, Typography, Avatar } from 'antd'

import iconSuccessFully from 'os/static/images/icon-dc-referral.svg'
import { setVisibleActionCenter } from 'os/store/ui.reducer'
import { RootDispatch, useRootDispatch } from 'os/store'
import { sntr } from 'os/providers/tokenProvider/supplementary'

export type ReferralSuccessProps = {
  visible?: boolean
  onCancel?: (visible: boolean) => void
}

const ReferralSuccess = ({
  visible = false,
  onCancel = () => {},
}: ReferralSuccessProps) => {
  const dispatch = useRootDispatch<RootDispatch>()

  const onGotIt = useCallback(() => {
    onCancel(false)
    dispatch(setVisibleActionCenter(false))
  }, [dispatch, onCancel])

  return (
    <Modal
      visible={visible}
      onCancel={() => onCancel(false)}
      footer={false}
      centered
      closable={false}
    >
      <Row gutter={[34, 34]} justify="center">
        <Col>
          <Image src={iconSuccessFully} preview={false} />
        </Col>
        <Col span={20} style={{ textAlign: 'center' }}>
          <Space size={4} direction="vertical">
            <Typography.Title level={3}>Congratulation!</Typography.Title>
            <Typography.Text type="secondary">
              You have a reward. The reward will be distributed periodically by
              the team.
            </Typography.Text>
            <Typography.Text
              style={{
                fontSize: 72,
                fontWeight: 800,
                lineHeight: '72px',
                color: '#F9575E',
              }}
            >
              10
            </Typography.Text>
            <Space>
              <Avatar
                alt="sntr"
                size={24}
                src={sntr(102).logoURI} /* The nerwork doesn't matter */
              />
              <Typography.Text>SNTR</Typography.Text>
            </Space>
          </Space>
        </Col>
        <Col>
          <Button type="primary" onClick={onGotIt}>
            Got it
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}
export default ReferralSuccess
