import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'os/store'
import PDB from 'shared/pdb'

import { Col, Row } from 'antd'
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
    <Row>
      <Col span={24}>
        <Preview value={data} title="Data" />
      </Col>
    </Row>
  )
}
export default ReviewData
