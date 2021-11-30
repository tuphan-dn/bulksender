import React from 'react'

import IonIcon from 'shared/ionicon'

const BlueTick = ({
  verified,
  size = 20,
  color = 'inherit',
}: {
  verified?: boolean
  size?: number
  color?: string
}) => {
  return verified ? (
    <IonIcon
      name="checkmark-circle"
      style={{
        color: color,
        fontSize: size,
      }}
    />
  ) : null
}

export default BlueTick
