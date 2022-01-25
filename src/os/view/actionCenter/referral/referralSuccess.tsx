import { Button, Col, Image, Modal, Row, Space, Typography } from 'antd'

import iconSuccessFully from 'os/static/images/icon-dc-referral.svg'
import { setVisibleActionCenter } from 'os/store/ui.reducer'
import { RootDispatch, useRootDispatch } from 'os/store'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

const ReferralSuccessFully = ({
  visible = false,
  onCancel = () => {},
}: {
  visible?: boolean
  onCancel?: (visible: boolean) => void
}) => {
  const dispatch = useRootDispatch<RootDispatch>()

  const onGotIt = () => {
    onCancel(false)
    dispatch(setVisibleActionCenter(false))
  }

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
              You have a reward.
            </Typography.Text>
            <Typography.Text
              style={{
                fontSize: 72,
                fontWeight: 800,
                lineHeight: '72px',
                color: '#F9575E',
              }}
            >
              1
            </Typography.Text>
            <Space>
              <MintAvatar mintAddress={''} />
              <MintSymbol mintAddress={''} />
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
export default ReferralSuccessFully
