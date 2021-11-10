import { account } from '@senswap/sen-js'
import { Modal, Row, Space, Typography } from 'antd'
import { RootState } from 'os/store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import IonIcon from 'shared/ionicon'
import PDB from 'shared/pdb'

type Props = {
  isOpen: boolean
  onClose: () => void
  cid: string
}

export default function ConfirmRestore({ cid, isOpen, onClose }: Props) {
  const { address } = useSelector((state: RootState) => state.wallet)
  const pdb = useMemo(() => {
    if (!account.isAddress(address)) return null
    return new PDB(address)
  }, [address])

  async function onRestore() {
    if (!pdb)
      return window.notify({
        type: 'error',
        description: 'Please connect he wallet first',
      })
    if (!cid)
      return window.notify({
        type: 'error',
        description: 'Invalid backup link format',
      })
    await pdb.restore(cid)
    onClose()
    return (window.location.href = '/home')
  }
  return (
    <Modal
      visible={isOpen}
      okText="Restore"
      onOk={onRestore}
      onCancel={onClose}
      centered
    >
      <Row gutter={[4, 4]}>
        <Space align="baseline">
          <Typography.Text type="warning">
            <IonIcon name="alert-circle-outline" />
          </Typography.Text>
          <Space direction="vertical" size={0}>
            <Typography.Title level={5}>
              Do you want to Restore?
            </Typography.Title>
            <Typography.Text>Some data will be lost.</Typography.Text>
          </Space>
        </Space>
      </Row>
    </Modal>
  )
}
