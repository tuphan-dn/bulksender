import { useState } from 'react'

import { Row, Col, Button, Card, Typography } from 'antd'
import IonIcon from 'shared/ionicon'
import Backup from './backup'
import Restore from './restore'

const Sync = () => {
  const [isOpenBackup, setIsOpenBackup] = useState(false)
  const [isOpenRestore, setIsOpenRestore] = useState(false)

  return (
    <Card bodyStyle={{ padding: 16 }} hoverable>
      {/* Modal */}
      <Backup isOpen={isOpenBackup} onClose={() => setIsOpenBackup(false)} />
      <Restore isOpen={isOpenRestore} onClose={() => setIsOpenRestore(false)} />
      {/* Content */}
      <Row gutter={[16, 20]}>
        <Col span={24}>
          <Typography.Text>Backup & Restore</Typography.Text>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Button
                type="primary"
                icon={<IonIcon name="cloud-done-outline" />}
                onClick={() => setIsOpenBackup(true)}
                block
              >
                Backup
              </Button>
            </Col>
            <Col span={24}>
              <Button
                icon={<IonIcon name="archive-outline" />}
                onClick={() => setIsOpenRestore(true)}
                block
              >
                Restore
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default Sync
