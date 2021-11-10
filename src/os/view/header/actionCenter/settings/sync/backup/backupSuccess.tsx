import { Button, Col, Image, Input, Modal, Row, Typography } from 'antd'
import IonIcon from 'shared/ionicon'
import SuccessImg from 'os/static/images/success.png'

type Props = {
  link: string
  onClose: () => void
}

export default function BackupSuccess({ link, onClose }: Props) {
  const onCopyLink = () => {
    navigator.clipboard.writeText(link)
    return window.notify({
      type: 'success',
      description: 'Link has been copied!',
    })
  }
  return (
    <Modal
      title="Backup"
      centered
      visible
      maskClosable={false}
      onCancel={onClose}
      closeIcon={<IonIcon name="close" />}
      bodyStyle={{ maxHeight: '70vh', overflowX: 'auto' }}
      footer={null}
    >
      <Row
        gutter={[20, 20]}
        align="middle"
        justify="center"
        style={{ textAlign: 'center' }}
      >
        <Col span={24}>
          <Image src={SuccessImg} preview={false} />
        </Col>
        <Col span={24}>
          <Typography.Title level={3}>Backup successfully</Typography.Title>
        </Col>
        <Col span={24}>
          <Input
            prefix={
              <Button
                type="text"
                size="small"
                style={{ marginLeft: -7 }}
                icon={<IonIcon name="link-outline" />}
              />
            }
            suffix={
              <Button
                type="text"
                size="small"
                icon={<IonIcon name="copy-outline" />}
                onClick={onCopyLink}
              />
            }
            value={link}
          />
        </Col>
        <Col span={24}>
          <Button type="primary" onClick={onClose}>
            OK
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}
