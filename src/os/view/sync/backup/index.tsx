import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import { Button, Card, Checkbox, Col, Row, Typography } from 'antd'
import IonIcon from 'shared/ionicon'
import BackupSuccess from './backupSuccess'
import ReviewManual from './reviewManual'
import ReviewData from './reviewData'

import { RootState } from 'os/store'
import PDB from 'shared/pdb'

const Backup = () => {
  const { address: walletAddress } = useSelector(
    (state: RootState) => state.wallet,
  )
  const [link, setLink] = useState('')
  const [acceptable, setAcceptable] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const onBackup = useCallback(async () => {
    const pdb = new PDB(walletAddress)
    const cid = await pdb.backup()
    await setLink(`${window.location.origin}/sync?cid=${cid}`)
    return setIsOpen(true)
  }, [walletAddress])

  return (
    <Row style={{ maxWidth: 520 }}>
      <Col>
        <Card title={<Typography.Title level={5}>Backup</Typography.Title>}>
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
            <Col span={24}>
              <Button
                disabled={!acceptable}
                type="primary"
                block
                icon={<IonIcon name="cloud-upload-outline" />}
                onClick={onBackup}
              >
                Generate a backup link
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <BackupSuccess
        isOpen={isOpen}
        link={link}
        onClose={() => setIsOpen(false)}
      />
    </Row>
  )
}

export default Backup
