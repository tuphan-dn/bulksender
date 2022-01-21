import { Button, Image, Space } from 'antd'

import telegram from 'os/static/images/icon-telegram.svg'
import twitter from 'os/static/images/icon-twitter.svg'
import { RootState, useRootSelector } from 'os/store'
import configs from 'os/configs'

const SHARE_SOCIAL = [
  { icon: twitter, src: 'http://twitter.com/intent/tweet?' },
  { icon: telegram, src: 'https://telegram.me/share/url?' },
]
const {
  referral: { base },
} = configs

const ShareReferral = () => {
  const {
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)

  const onShare = (url: string) => {
    const params: Record<string, string> = {
      url: base + walletAddress,
      text: "Many Sentre's 🎁 is waiting. Join the party with me here 🎉🥳",
    }
    for (const prop in params)
      url += '&' + prop + '=' + encodeURIComponent(params[prop] || '')
    window.open(
      url,
      '_blank',
      'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0',
    )
  }

  return (
    <Space>
      {SHARE_SOCIAL.map((social, idx) => (
        <Button
          type="text"
          onClick={() => onShare(social.src)}
          icon={<Image src={social.icon} preview={false} />}
          key={idx}
        />
      ))}
    </Space>
  )
}

export default ShareReferral
