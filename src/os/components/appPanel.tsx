import { Image } from 'antd'
import { StaticLoader } from 'os/components/appLoader'

import register from 'senhub.register'

const AppPanel = ({
  appId,
  onClick = () => {},
}: {
  appId: string
  onClick?: () => void
}) => {
  return (
    <StaticLoader
      type="panel"
      {...register[appId]}
      render={(src) => (
        <Image
          src={src}
          width="100%"
          height="auto"
          onClick={onClick}
          preview={false}
        />
      )}
    />
  )
}

export default AppPanel
