import { useHistory } from 'react-router-dom'

import { Button, Col, Image, Modal, Row, Space, Typography } from 'antd'

import iconSuccessFully from 'os/static/images/icon-cs-referral.svg'
import { setVisibleActionCenter } from 'os/store/ui.reducer'
import { RootDispatch, useRootDispatch } from 'os/store'
import IonIcon from 'shared/antd/ionicon'

const ConfirmSuccessFully = ({
  visible = false,
  onCancel = () => {},
}: {
  visible?: boolean
  onCancel?: (visible: boolean) => void
}) => {
  const history = useHistory()
  const dispatch = useRootDispatch<RootDispatch>()

  const onDeposit = () => {
    onCancel(false)
    history.push('/app/sen_lp')
    dispatch(setVisibleActionCenter(false))
  }

  const onBackDashboard = () => {
    onCancel(false)
    history.push('/dashboard')
  }

  return (
    <Modal
      visible={visible}
      onCancel={onBackDashboard}
      footer={false}
      centered
      closeIcon={<IonIcon name="close-outline" />}
    >
      <Row gutter={[34, 34]} justify="center">
        <Col>
          <Image
            style={{ marginTop: 32 }}
            src={iconSuccessFully}
            preview={false}
          />
        </Col>
        <Col span={20}>
          <Space size={4} direction="vertical" style={{ textAlign: 'center' }}>
            <Typography.Title level={3}>Successfully!</Typography.Title>
            <Typography.Text type="secondary">
              You have completed the referral confirmation. Let's complete to
              the first of mission to get{' '}
              <strong style={{ color: '#F9575E' }}>10 SNTR</strong>.
            </Typography.Text>
          </Space>
        </Col>
        <Col>
          <Button type="primary" onClick={onDeposit}>
            Deposit
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}
export default ConfirmSuccessFully
