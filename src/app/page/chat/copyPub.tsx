import { Col, Row, Tooltip, Typography } from 'antd'
import { CopyOutlined } from '@ant-design/icons'

import CopyToClipboard from 'react-copy-to-clipboard'
import { useState } from 'react'

const CopyPublicKey = ({ pubKey }: { pubKey: string }) => {
  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Row>
      <Col flex="auto">
        <Typography.Text>My PublicKey: {pubKey}</Typography.Text>
      </Col>
      <Col>
        <Tooltip title="Copied" visible={copied}>
          <CopyToClipboard text={pubKey} onCopy={onCopy}>
            <CopyOutlined onClick={onCopy} />
          </CopyToClipboard>
        </Tooltip>
      </Col>
    </Row>
  )
}

export default CopyPublicKey
