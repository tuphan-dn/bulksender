import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import QRCode from 'qrcode.react'

import { Button, Input, Popover, Space, Tooltip } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { asyncWait } from 'shared/util'
import configs from 'os/configs'
import { RootState, useRootSelector } from 'os/store'

const {
  referral: { base },
} = configs

const QR = ({ value }: { value: string }) => {
  return (
    <Popover
      placement="bottomLeft"
      color="#ffffff"
      overlayInnerStyle={{ paddingTop: 6 }}
      content={
        <QRCode value={value} size={140} bgColor="#ffffff" fgColor="#1f1f1f" />
      }
      trigger="click"
      arrowPointAtCenter
    >
      <Button
        type="text"
        size="small"
        icon={<IonIcon name="qr-code-outline" />}
      />
    </Popover>
  )
}

const YourReferral = () => {
  const [copied, setCopied] = useState(false)
  const {
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)

  const onCopy = async () => {
    setCopied(true)
    await asyncWait(1500)
    setCopied(false)
  }

  return (
    <Input
      value={base + walletAddress}
      size="large"
      suffix={
        <Space size={0}>
          <QR value={base + walletAddress} />
          <Tooltip title="Copied" visible={copied}>
            <CopyToClipboard text={base + walletAddress}>
              <Button
                type="text"
                size="small"
                icon={<IonIcon name="copy-outline" />}
                onClick={onCopy}
              />
            </CopyToClipboard>
          </Tooltip>
        </Space>
      }
      readOnly
    />
  )
}
export default YourReferral
