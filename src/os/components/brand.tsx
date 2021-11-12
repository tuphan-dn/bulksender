import { CSSProperties } from 'react'
import { useHistory } from 'react-router-dom'

import fullLogo from 'os/static/images/sen-full.png'
import fullLogoDark from 'os/static/images/sen-full-dark.png'
import liteLogo from 'os/static/images/sen-lite.png'

const Brand = ({
  style,
  lite = false,
  darkTheme,
}: {
  lite?: boolean
  style: CSSProperties
  darkTheme?: boolean
}) => {
  const history = useHistory()

  return (
    <img
      src={lite ? liteLogo : darkTheme ? fullLogoDark : fullLogo}
      style={style}
      alt="logo"
      onClick={() => history.push('/')}
    />
  )
}

export default Brand
