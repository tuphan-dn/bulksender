import { useHistory } from 'react-router-dom'

import { Avatar } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

const More = () => {
  const history = useHistory()
  return (
    <span style={{ cursor: 'pointer' }} onClick={() => history.push('/store')}>
      <Avatar shape="square">
        <IonIcon name="add-outline" />
      </Avatar>
    </span>
  )
}

export default More
