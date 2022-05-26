import IonIcon from '@sentre/antd-ionicon'

export type VerificationProps = {
  verified?: boolean
  size?: number
  color?: string
}

const Verification = ({
  verified,
  size = 16,
  color = '#18A0FB',
}: VerificationProps) => {
  return verified ? (
    <IonIcon name="checkmark-circle" style={{ color, fontSize: size }} />
  ) : null
}

export default Verification
