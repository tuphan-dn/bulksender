import { useMemo, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import {
  Button,
  Col,
  Image,
  Input,
  Row,
  Space,
  Tooltip,
  Typography,
  Modal,
} from 'antd'
import Telegram from 'os/static/images/telegram.png'
import Twitter from 'os/static/images/twitter.png'

import IonIcon from 'shared/ionicon'
import { RootState } from 'os/store'
import { useSelector } from 'react-redux'
import { asyncWait } from 'shared/util'

const ShareModal = ({
  appId,
  shareWith,
  visible,
  onClose,
}: {
  appId: string
  shareWith: string
  visible: boolean
  onClose: () => void
}) => {
  const [copied, setCopied] = useState(false)
  const { register } = useSelector((state: RootState) => state.page)
  const { name } = register[appId] || {}

  const onClick = (type?: string) => {
    let telegramURL = 'https://telegram.me/share/url?'
    let twitterURL = 'http://twitter.com/intent/tweet?'
    if (type === 'twitter') return onShare(twitterURL)
    return onShare(telegramURL)
  }
  const onShare = (url?: string) => {
    const params: Record<string, string> = {
      url: window.location.href,
      text: name || '',
    }
    for (const prop in params)
      url += '&' + prop + '=' + encodeURIComponent(params[prop] || '')
    window.open(
      url,
      '_blank',
      'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0',
    )
  }
  const onCopy = async () => {
    setCopied(true)
    await asyncWait(1500)
    setCopied(false)
  }

  const shareLogo = useMemo(() => {
    if (shareWith === 'twitter') return Twitter
    return Telegram
  }, [shareWith])

  return (
    <Modal
      closable={false}
      visible={visible}
      onCancel={() => onClose()}
      closeIcon={<IonIcon name="close" />}
      footer={null}
      centered
      bodyStyle={{ padding: 32 }}
    >
      <Row gutter={[20, 20]} justify="center" style={{ textAlign: 'center' }}>
        <Col>
          <Image src={shareLogo} preview={false} style={{ width: 56 }} />
        </Col>
        <Col span={24}>
          <Typography.Title level={3}>Share this application</Typography.Title>
          <Typography.Text>Copy your link or share now!</Typography.Text>
        </Col>
        <Col span={16}>
          <Input
            suffix={
              <Tooltip title="Copied" visible={copied}>
                <CopyToClipboard text={window.location.href}>
                  <Button
                    type="text"
                    size="small"
                    icon={<IonIcon name="copy-outline" />}
                    onClick={onCopy}
                  />
                </CopyToClipboard>
              </Tooltip>
            }
            value={window.location.href}
          />
        </Col>
        <Col>
          <Space>
            <Button className="btn-share" onClick={() => onClose()}>
              Cancle
            </Button>
            <Button
              type="primary"
              className="btn-share"
              onClick={() => onClick(shareWith)}
            >
              Share now
            </Button>
          </Space>
        </Col>
      </Row>
    </Modal>
  )
}

export default ShareModal
