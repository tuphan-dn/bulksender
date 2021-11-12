import { Row, Col, Typography } from 'antd'
import ReactJson from 'react-json-view'

const Preview = ({ value = {}, title }: { value: object; title?: string }) => {
  return (
    <Row gutter={[8, 8]}>
      {title && (
        <Col span={24}>
          <Typography.Text type="secondary">{title}</Typography.Text>
        </Col>
      )}
      <Col span={24}>
        <Row
          style={{
            backgroundColor: '#E9E9EB',
            borderRadius: 8,
            padding: '12px 16px',
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
      </Col>
    </Row>
  )
}

export default Preview
