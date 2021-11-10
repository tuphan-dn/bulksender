import { Row, Col } from 'antd'
import ReactJson from 'react-json-view'

const Preview = ({ value = {} }: { value: object }) => {
  return (
    <Row
      gutter={[16, 16]}
      style={{
        backgroundColor: '#E9E9EB',
        padding: '12px 16px',
        borderRadius: 8,
      }}
    >
      <Col span={24}>
        <ReactJson
          src={value}
          style={{ background: 'transparent', fontSize: 12 }}
          iconStyle="circle"
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
          indentWidth={2}
        />
      </Col>
    </Row>
  )
}

export default Preview
