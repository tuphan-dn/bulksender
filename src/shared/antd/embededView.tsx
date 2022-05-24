import { useEffect, useMemo } from 'react'
import { Gateway } from '@sentre/connector'
import { useUI } from '@senhub/providers'

export type EmbededViewProps = {
  appId: string
  src: string
  title: string
  background?: { light: string; dark: string }
}

const EmbededView = ({ appId, src, title, background }: EmbededViewProps) => {
  const { setBackground } = useUI()
  // This trick is to avoid render loop if user directly pass in an object
  const theme = useMemo(() => JSON.stringify(background), [background])
  // Set theme
  useEffect(() => {
    if (theme) setBackground(JSON.parse(theme))
  }, [setBackground, theme])
  // Setup wallet gateway
  useEffect(() => {
    const gateway = new Gateway(window.sentre.wallet)
    return gateway.terminate
  }, [])

  return (
    <iframe
      id={appId + '-iframe'}
      src={src}
      title={title}
      style={{
        height: 'calc(100vh - 64px)',
        margin: -12,
        marginTop: -24,
        border: 'none',
        width: '100vw',
      }}
      loading="lazy"
      allowFullScreen
    />
  )
}

export default EmbededView
