import { Button, Popover } from 'antd'
import IonIcon from 'shared/ionicon'
import QRCode from 'qrcode.react'

export const QR = ({ address }: { address: string }) => {
  return (
    <Popover
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
    >
      <Button
        type="text"
        size="small"
        icon={<IonIcon name="qr-code-outline" />}
        style={{ padding: 0, width: 'auto', height: 'auto', color: '#BEC4EC' }}
      />
    </Popover>
  )
}
