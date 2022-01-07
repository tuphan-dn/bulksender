import IonIcon from 'shared/antd/ionicon'

const Verification = ({
  verified,
  size = 16,
  color = '#18A0FB',
}: {
  verified?: boolean
  size?: number
  color?: string
}) => {
  return verified ? (
    <IonIcon name="checkmark-circle" style={{ color, fontSize: size }} />
  ) : null
}

export default Verification
