import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Tooltip, Space, Typography, Popover } from 'antd'
import QRCode from 'qrcode.react'

import { explorer, shortenAddress, asyncWait } from 'shared/util'
import { RootState } from 'os/store'
import IconButton from './iconButton'

const QR = ({ address }: { address: string }) => {
  return (
    <Popover
      placement="bottomLeft"
      color="#ffffff"
      overlayInnerStyle={{ paddingTop: 6 }}
      content={
        <QRCode
          value={address}
          size={140}
          bgColor="#ffffff"
          fgColor="#1f1f1f"
        />
      }
      trigger="click"
      arrowPointAtCenter
    >
      <IconButton name="qr-code-outline" />
    </Popover>
  )
}

const Address = () => {
  const { address } = useSelector((state: RootState) => state.wallet)
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    setCopied(true)
    navigator.clipboard.writeText(address)
    await asyncWait(1500)
    setCopied(false)
  }

  return (
    <Space size={10}>
      <Typography.Text
        style={{ color: '#E9E9EB', cursor: 'pointer' }}
        onClick={() => window.open(explorer(address), '_blank')}
      >
        {shortenAddress(address, 3, '...')}
      </Typography.Text>
      <Tooltip title="Copied" visible={copied}>
        <IconButton name="copy-outline" onClick={onCopy} />
      </Tooltip>
      <QR address={address} />
    </Space>
  )
}

export default Address
