import { useState, ChangeEvent, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Row, Col, Button, Input, Typography, Card } from 'antd'
import IonIcon from 'shared/ionicon'
import JsonViewer from 'os/components/jsonViewer'
import ConfirmRestore from './confirm'

import { RootState } from 'os/store'
import PDB from 'shared/pdb'
import IPFS from 'shared/pdb/ipfs'

const Restore = () => {
  const { address } = useSelector((state: RootState) => state.wallet)

  const [link, setLink] = useState('')
  const [cid, setCID] = useState('')
  const [data, setData] = useState({})
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

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
  // Parse CID from props
  useEffect(() => {
    const link = window.location.href
    const { search } = new URL(link)
    const params = new URLSearchParams(search)
    const cid = params.get('cid')
    if (!cid || !IPFS.isCID(cid)) return
    setLink(link)
  }, [])
  // Parse data
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      if (!IPFS.isCID(cid)) return setData({})
      const pdb = new PDB(address)
      const data = await pdb.fetch(cid)
      setData(data)
      setLoading(false)
    })()
  }, [address, cid])

  return (
    <Row style={{ maxWidth: 520 }}>
      <Col>
        <Card title={<Typography.Title level={5}>Restore</Typography.Title>}>
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

            <Col span={24}>
              <Button
                type="primary"
                icon={<IonIcon name="push-outline" />}
                onClick={() => setVisible(true)}
                disabled={!IPFS.isCID(cid)}
                block
                loading={loading}
              >
                Restore
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <ConfirmRestore
        visible={visible}
        onClose={() => setVisible(false)}
        cid={cid}
      />
    </Row>
  )
}

export default Restore
