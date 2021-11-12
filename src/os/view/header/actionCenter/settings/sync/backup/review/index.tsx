import { useState } from 'react'

import IonIcon from 'shared/ionicon'
import { Button, Checkbox, Col, Modal, Row, Space, Typography } from 'antd'
import Policy from './policy'
import ReviewData from './data'

type Props = {
  onClose: () => void
  onOk: () => void
}

export default function Review({ onClose, onOk }: Props) {
  const [isUnderstood, setIsUnderstood] = useState(false)

  return (
    <Modal
      title="Backup"
      centered
      visible
      onCancel={onClose}
      closeIcon={<IonIcon name="close" />}
      bodyStyle={{ maxHeight: '70vh', overflowX: 'auto' }}
      footer={
        <Button
          disabled={!isUnderstood}
          type="primary"
          block
          icon={<IonIcon name="cloud-upload-outline" />}
          onClick={onOk}
        >
          Gen a backup link
        </Button>
      }
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Policy />
        </Col>
        <Col span={24}>
          <ReviewData />
        </Col>
        <Col span={24}>
          <Space>
            <Checkbox
              checked={isUnderstood}
              onChange={() => setIsUnderstood(!isUnderstood)}
            ></Checkbox>
            <Typography.Text>I have read and understood</Typography.Text>
          </Space>
        </Col>
      </Row>
    </Modal>
  )
}
