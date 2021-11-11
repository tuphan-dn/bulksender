import { Col, Row, Typography } from 'antd'

const Policy = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text type="secondary">Policy</Typography.Text>
      </Col>
      <Col span={24}>
        <Row
          gutter={[0, 16]}
          style={{
            backgroundColor: '#E9E9EB',
            padding: '12px 16px',
            borderRadius: 8,
          }}
        >
          <Col span={24}>
            <Typography.Title level={5}>
              Why should I create a backup?
            </Typography.Title>
            <ul style={{ paddingLeft: 16 }}>
              <li>
                <Typography.Text>
                  Because Sentre never collects your data, so the data is
                  locally available.
                </Typography.Text>
              </li>
              <li>
                <Typography.Text>
                  You can move data in the current device to a new one.
                </Typography.Text>
              </li>
              <li>
                <Typography.Text>
                  Restore data in case your device is broken or suddenly lost.
                </Typography.Text>
              </li>
            </ul>
          </Col>
          <Col span={24}>
            <Typography.Title level={5}>What is IPFS?</Typography.Title>
            <ul style={{ paddingLeft: 16 }}>
              <li>
                <Typography.Text>
                  IPFS is a decentralized database. By high availability, data
                  can be fetched via an internet connection.
                </Typography.Text>
              </li>
              <li>
                <Typography.Text>
                  Everyone can publicly access data on it, and even your stored
                  data.
                </Typography.Text>
              </li>
            </ul>
          </Col>
          <Col span={24}>
            <Typography.Title level={5} type="danger">
              Be aware of privacy!
            </Typography.Title>
            <ul style={{ paddingLeft: 16 }}>
              <li>
                <Typography.Text>
                  Make sure that no sensitive data is in the storage.
                </Typography.Text>
              </li>
              <li>
                <Typography.Text>
                  It's rarely happened, but there is a little chance of losing
                  your data on IPFS.
                </Typography.Text>
              </li>
            </ul>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
export default Policy
