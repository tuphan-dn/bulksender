import { Button, Image, Space } from 'antd'

import telegram from 'os/static/images/icon-telegram.svg'
import discord from 'os/static/images/icon-discord.svg'
import twitter from 'os/static/images/icon-twitter.svg'

const SHARE_SOCIAL = [
  { icon: twitter, src: 'https://twitter.com' },
  { icon: telegram, src: 'https://twitter.com' },
  { icon: discord, src: 'https://twitter.com' },
]
const ShareReferral = () => {
  return (
    <Space>
      {SHARE_SOCIAL.map((social, idx) => (
        <Button
          type="text"
          onClick={() => window.open(social.src, '_blank')}
          icon={<Image src={social.icon} preview={false} />}
          key={idx}
        />
      ))}
    </Space>
  )
}

export default ShareReferral
