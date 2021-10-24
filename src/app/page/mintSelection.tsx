import { Row, Col, Select } from 'antd'
import { useAccount } from 'senhub/providers'

const MintSelection = () => {
  const { accounts } = useAccount()
  console.log(accounts)
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}></Col>
    </Row>
  )
}

export default MintSelection
