import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'os/store'
import PDB from 'shared/pdb'

import { Col, Row, Typography } from 'antd'
import Preview from '../../preview'

const ReviewData = () => {
  const { address: walletAddress } = useSelector(
    (state: RootState) => state.wallet,
  )
  const [data, setData] = useState({})

  useEffect(() => {
    const pdb = new PDB(walletAddress)
    pdb.all().then((data) => setData(data))
  }, [walletAddress])

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text type="secondary">Data</Typography.Text>
      </Col>
      <Col span={24}>
        <Preview value={data} />
      </Col>
    </Row>
  )
}
export default ReviewData
