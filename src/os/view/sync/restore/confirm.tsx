import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Modal, Row, Col, Space, Typography, Button } from 'antd'
import IonIcon from 'shared/ionicon'

import { RootState } from 'os/store'
import PDB from 'shared/pdb'

const ConfirmRestore = ({
  cid,
  visible,
  onClose = () => {},
}: {
  onClose?: () => void
  cid: string
  visible: boolean
}) => {
  const { address } = useSelector((state: RootState) => state.wallet)

  const onRestore = useCallback(async () => {
    try {
      const pdb = new PDB(address)
      await pdb.restore(cid)
      return (window.location.href = '/welcome')
    } catch (er) {
      return window.notify({
        type: 'error',
        description: (er as any).message,
      })
    }
  }, [address, cid])

  return (
    <Modal visible={visible} footer={null} centered>
      <Row gutter={[24, 24]} justify="end">
        <Col span={24}>
          <Space align="baseline">
            <Typography.Text type="warning">
              <IonIcon name="alert-circle-outline" />
            </Typography.Text>
            <Space direction="vertical" size={0}>
              <Typography.Title level={5}>
                Do you want to Restore?
              </Typography.Title>
              <Typography.Text>
                The current data on your device will be overridden and no longer
                could be retrieved.
              </Typography.Text>
            </Space>
          </Space>
        </Col>
        <Col>
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onRestore}>
              Restore
            </Button>
          </Space>
        </Col>
      </Row>
    </Modal>
  )
}

export default ConfirmRestore
