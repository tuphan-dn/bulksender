import { useCallback, useEffect, useState } from 'react'

import { Avatar } from 'antd'
import IonIcon from 'shared/ionicon'

import { usePool, useMint } from 'senhub/providers'

const MintAvatar = ({
  mintAddress,
  onClick = () => {},
  size = 24,
}: {
  mintAddress: string
  size?: number
  onClick?: () => void
}) => {
  const { pools } = usePool()
  const { tokenProvider } = useMint()
  const [logoURIs, setLogoURIs] = useState<(string | undefined)[]>([])

  const getLogoURIs = useCallback(async () => {
    // Normal mint
    const { logoURI } = (await tokenProvider.findByAddress(mintAddress)) || {}
    if (logoURI) return setLogoURIs([logoURI])
    // LP mint
    const poolData = Object.values(pools).find(
      ({ mint_lpt }) => mint_lpt === mintAddress,
    )
    if (poolData) {
      const { mint_a, mint_b } = poolData
      const { logoURI: logoURIA } =
        (await tokenProvider.findByAddress(mint_a)) || {}
      const { logoURI: logoURIB } =
        (await tokenProvider.findByAddress(mint_b)) || {}
      return setLogoURIs([logoURIA, logoURIB])
    }
    // Unknown mint
    return setLogoURIs([undefined])
  }, [mintAddress, pools, tokenProvider])

  useEffect(() => {
    getLogoURIs()
  }, [getLogoURIs])

  return (
    <span onClick={onClick}>
      <Avatar.Group style={{ display: 'block' }}>
        {logoURIs.map((logoURI, i) => (
          <Avatar
            key={i}
            src={logoURI}
            size={size}
            style={{ backgroundColor: '#f0f2f5', border: 'none' }}
          >
            <IonIcon name="diamond-outline" />
          </Avatar>
        ))}
      </Avatar.Group>
    </span>
  )
}

export default MintAvatar
