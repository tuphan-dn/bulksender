import { useState } from 'react'

import { Row, Col, Button, Card, Typography } from 'antd'
import IonIcon from 'shared/ionicon'
import Backup from './backup'
import Restore from './restore'

const Sync = () => {
  const [visibleBackup, setVisibleBackup] = useState(false)
  const [visibleRestore, setVisibleRestore] = useState(false)

  return (
    <Card bodyStyle={{ padding: 16 }} hoverable bordered={false}>
      {/* Modal */}
      {visibleBackup && <Backup onClose={() => setVisibleBackup(false)} />}
      {visibleRestore && <Restore onClose={() => setVisibleRestore(false)} />}
      {/* Content */}
      <Row gutter={[16, 22]}>
        <Col span={24}>
          <Typography.Text>Backup & Restore</Typography.Text>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Button
                type="primary"
                icon={<IonIcon name="cloud-done-outline" />}
                onClick={() => setVisibleBackup(true)}
                block
              >
                Backup
              </Button>
            </Col>
            <Col span={24}>
              <Button
                icon={<IonIcon name="archive-outline" />}
                onClick={() => setVisibleRestore(true)}
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
