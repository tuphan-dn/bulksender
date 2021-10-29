import { useHistory } from 'react-router-dom'

import fullLogo from 'os/static/images/sen-full.png'

const Brand = ({ style }: any) => {
  const history = useHistory()

  return (
    <img
      src={fullLogo}
      style={style}
      alt="logo"
      onClick={() => history.push('/')}
    />
  )
}

export default Brand
