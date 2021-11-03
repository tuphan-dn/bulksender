import { Row, Col, Button, Card, Typography } from 'antd'
import { RootState } from 'os/store'
import { useSelector } from 'react-redux'
import IonIcon from 'shared/ionicon'

import PDB from 'shared/pdb'

const Sync = () => {
  const { address: walletAddress } = useSelector(
    (state: RootState) => state.wallet,
  )

  const pdb = new PDB(walletAddress)

  const onBackup = async () => {
    console.log('onBackup')
    const re = await pdb.backup()
    console.log(re)
  }
  const onRestore = async () => {
    console.log('onRestore')
    const re = await pdb.restore(
      'QmdxL9t5BMUjMkZD5VZ7McJzfR9gcv6ZZcXRvXzCNrGNVS',
    )
    console.log(re)
  }

  return (
    <Card bodyStyle={{ padding: 16 }} hoverable>
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
                onClick={onBackup}
                block
              >
                Backup
              </Button>
            </Col>
            <Col span={24}>
              <Button
                icon={<IonIcon name="archive-outline" />}
                onClick={onRestore}
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
