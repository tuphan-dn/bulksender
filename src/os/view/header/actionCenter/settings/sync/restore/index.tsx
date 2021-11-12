import { useState, ChangeEvent, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Row, Col, Button, Modal, Input } from 'antd'
import IonIcon from 'shared/ionicon'
import JsonViewer from 'os/components/jsonViewer'
import ConfirmRestore from './confirm'

import { RootState } from 'os/store'
import PDB from 'shared/pdb'
import IPFS from 'shared/pdb/ipfs'

const Restore = ({ onClose = () => {} }: { onClose?: () => void }) => {
  const { address } = useSelector((state: RootState) => state.wallet)
  const [link, setLink] = useState('')
  const [cid, setCID] = useState('')
  const [data, setData] = useState({})
  const [confirmed, setConfirmed] = useState(false)

  // Parse CID
  useEffect(() => {
    try {
      const { search } = new URL(link)
      const params = new URLSearchParams(search)
      return setCID(params.get('cid') as string)
    } catch (er) {
      return setCID('')
    }
  }, [link])
  // Parse data
  useEffect(() => {
    ;(async () => {
      if (!IPFS.isCID(cid)) return setData({})
      const pdb = new PDB(address)
      const data = await pdb.fetch(cid)
      return setData(data)
    })()
  }, [address, cid])

  if (confirmed) return <ConfirmRestore onClose={onClose} cid={cid} />
  return (
    <Modal
      title="Restore"
      centered
      visible
      onCancel={onClose}
      closeIcon={<IonIcon name="close" />}
      footer={
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Button
              type="primary"
              size="small"
              icon={<IonIcon name="push-outline" />}
              onClick={() => setConfirmed(true)}
              disabled={!IPFS.isCID(cid)}
              block
            >
              Restore
            </Button>
          </Col>
        </Row>
      }
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Input
            placeholder="https://hub.sentre.io/sync?cid=..."
            prefix={
              <Button
                type="text"
                size="small"
                style={{ marginLeft: -7 }}
                icon={<IonIcon name="link-outline" />}
              />
            }
            value={link}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLink(e.target.value || '')
            }
          />
        </Col>
        <Col span={24}>
          <JsonViewer value={data} />
        </Col>
      </Row>
    </Modal>
  )
}

export default Restore
