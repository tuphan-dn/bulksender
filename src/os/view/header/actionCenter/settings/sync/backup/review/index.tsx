import { useState } from 'react'

import { Button, Checkbox, Col, Modal, Row, Typography } from 'antd'
import IonIcon from 'shared/ionicon'
import ReviewManual from './manual'
import ReviewData from './data'

const Review = ({
  onClose,
  onOk,
}: {
  onClose: () => void
  onOk: () => void
}) => {
  const [acceptable, setAcceptable] = useState(false)

  return (
    <Modal
      title={<Typography.Title level={5}>Backup</Typography.Title>}
      centered
      visible
      onCancel={onClose}
      closeIcon={<IonIcon name="close" />}
      bodyStyle={{ maxHeight: '70vh', overflow: 'auto' }}
      footer={
        <Button
          disabled={!acceptable}
          type="primary"
          block
          icon={<IonIcon name="cloud-upload-outline" />}
          onClick={onOk}
        >
          Generate a backup link
        </Button>
      }
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ReviewManual />
        </Col>
        <Col span={24}>
          <ReviewData />
        </Col>
        <Col span={24}>
          <Checkbox
            checked={acceptable}
            onChange={() => setAcceptable(!acceptable)}
          >
            I have read and understood
          </Checkbox>
        </Col>
      </Row>
    </Modal>
  )
}

export default Review
