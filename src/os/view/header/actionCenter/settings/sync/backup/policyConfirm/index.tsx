import { useEffect, useState } from 'react'
import { Checkbox, Col, Row, Space, Typography } from 'antd'
import PDB from 'shared/pdb'
import { RootState } from 'os/store'
import Preview from '../../preview'
import { useSelector } from 'react-redux'
import Policy from './policy'

const PolicyConfirm = ({
  isConfirm,
  onConfirm,
}: {
  isConfirm: boolean
  onConfirm: () => void
}) => {
  const { address: walletAddress } = useSelector(
    (state: RootState) => state.wallet,
  )

  const [data, setData] = useState({})

  useEffect(() => {
    const pdb = new PDB(walletAddress)
    pdb.all().then((data) => setData(data))
  }, [walletAddress])

  return (
    <Row gutter={[16, 16]} style={{ overflowX: 'auto', maxHeight: '80vh' }}>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Typography.Text type="secondary">Policy</Typography.Text>
          </Col>
          <Col span={24}>
            <Policy />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Typography.Text type="secondary">Data</Typography.Text>
          </Col>
          <Col span={24}>
            <Preview value={data} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Space>
          <Checkbox checked={isConfirm} onChange={onConfirm}></Checkbox>
          <Typography.Text>I have read and understood</Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}
export default PolicyConfirm
