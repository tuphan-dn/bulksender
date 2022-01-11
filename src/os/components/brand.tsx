import { CSSProperties, useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { net } from 'shared/runtime'

import fullLogo from 'os/static/images/sen-full.png'
import fullLogoDark from 'os/static/images/sen-full-dark.png'
import liteLogo from 'os/static/images/sen-lite.png'
import fullLogoDev from 'os/static/images/sen-dev.svg'
import fullLogoDevDark from 'os/static/images/sen-dev-dark.svg'
import fullLogoTest from 'os/static/images/sen-test.svg'
import fullLogoTestDark from 'os/static/images/sen-test-dark.svg'
import liteLogoTest from 'os/static/images/sen-test-lite.svg'
import liteLogoDev from 'os/static/images/sen-dev-lite.svg'

const LOGO = {
  mainnet: fullLogo,
  mainnet_dark: fullLogoDark,
  mainnet_lite: liteLogo,
  devnet: fullLogoDev,
  devnet_dark: fullLogoDevDark,
  testnet: fullLogoTest,
  testnet_dark: fullLogoTestDark,
  devnet_lite: liteLogoDev,
  testnet_lite: liteLogoTest,
}

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

  const networkLogo = useMemo(() => {
    if (lite) return LOGO?.[`${net}_lite`]
    if (darkTheme) return LOGO?.[`${net}_dark`]
    return LOGO?.[net]
  }, [darkTheme, lite])

  return (
    <img
      src={networkLogo}
      style={style}
      alt="logo"
      onClick={() => history.push('/')}
    />
  )
}

export default Brand
