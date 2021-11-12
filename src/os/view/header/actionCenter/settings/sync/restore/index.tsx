import { useState, useMemo, ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { RootState } from 'os/store'
import PDB from 'shared/pdb'
import IPFS from 'shared/pdb/ipfs'

import { Row, Col, Button, Modal, Input } from 'antd'
import IonIcon from 'shared/ionicon'
import Preview from '../preview'
import ConfirmRestore from './confirm'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const ipfs = new IPFS()

const Restore = ({ isOpen, onClose }: Props) => {
  const { address } = useSelector((state: RootState) => state.wallet)
  const [isConfirm, setIsConfirm] = useState(false)
  const [restoreInfo, setRestoreInfo] = useState({
    link: '',
    cid: '',
    data: {},
  })

  const pdb = useMemo(() => {
    if (!account.isAddress(address)) return null
    return new PDB(address)
  }, [address])

  async function onChangeLinkRestore(e: ChangeEvent<HTMLInputElement>) {
    const restoreInfo = {
      link: e.target.value,
      cid: '',
      data: {},
    }
    //Parse cid
    const { search } = new URL(restoreInfo.link)
    const params = new URLSearchParams(search)
    const newCid = params.get('cid') as string
    if (IPFS.isCID(newCid)) restoreInfo.cid = newCid
    //Parse data
    if (newCid && pdb) {
      restoreInfo.data = await ipfs.get(newCid)
    }
    setRestoreInfo(restoreInfo)
  }

  if (isConfirm)
    return <ConfirmRestore onClose={onClose} cid={restoreInfo.cid} />

  return (
    <Modal
      title="Restore"
      centered
      visible={isOpen}
      onCancel={onClose}
      closeIcon={<IonIcon name="close" />}
      footer={
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Button
              type="primary"
              icon={<IonIcon name="push-outline" />}
              onClick={() => setIsConfirm(true)}
              disabled={!restoreInfo.cid}
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
            placeholder="https://app.senswap.com/sync?cid=..."
            prefix={
              <Button
                type="text"
                size="small"
                style={{ marginLeft: -7 }}
                icon={<IonIcon name="link-outline" />}
              />
            }
            value={restoreInfo.link}
            onChange={onChangeLinkRestore}
          />
        </Col>
        <Col span={24}>
          <Preview value={restoreInfo.data} title="Data" />
        </Col>
        <Col span={24}></Col>
      </Row>
    </Modal>
  )
}

export default Restore
