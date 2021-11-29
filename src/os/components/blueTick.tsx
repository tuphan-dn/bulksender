import React from 'react'

import IonIcon from 'shared/ionicon'

const BlueTick = ({ verified }: { verified: any }) => {
  return verified ? (
    <span
      style={{
        background: '#18A0FB ',
        width: 15,
        height: 15,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <IonIcon name="checkmark-outline" style={{ color: 'white' }} />
    </span>
  ) : null
}

export default BlueTick
