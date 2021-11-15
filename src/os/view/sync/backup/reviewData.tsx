import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Col, Row, Typography } from 'antd'
import JsonViewer from 'os/components/jsonViewer'

import { RootState } from 'os/store'
import PDB from 'shared/pdb'

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
        <JsonViewer value={data} />
      </Col>
    </Row>
  )
}

export default ReviewData
