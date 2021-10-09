import { forwardRef } from 'react'

import util from 'helpers/util'

/**
 * Application Logo
 */
const AppLogo = forwardRef<
  HTMLDivElement,
  {
    name: string
    src?: string
    title?: boolean
    size?: number
    style?: object
    shape?: 'round' | 'circle'
  }
>(
  (
    {
      name,
      src = '',
      title = true,
      size = 64,
      style: userStyle,
      shape = 'round',
      ...rest
    },
    ref,
  ) => {
    // Infer color
    const bgColor = util.randomColor(util.normalizeAppName(name), 'light')
    const symbol = name.substring(0, 2)
    const txtColor = util.randomColor(symbol, 'dark', bgColor)
    // Build background
    const bg = src
      ? {
          backgroundImage: `url("${src}")`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }
      : { backgroundColor: bgColor }
    // Render
    return (
      <div
        {...rest}
        style={{ cursor: 'pointer', ...userStyle, width: size }}
        ref={ref}
      >
        <div
          style={{
            width: size,
            height: size,
            borderRadius: shape === 'round' ? size / 4 : size / 2,
            display: 'flex',
            textAlign: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            fontSize: size / 2,
            ...bg,
          }}
        >
          <span
            style={{
              margin: 0,
              color: txtColor,
            }}
          >
            {src ? null : <strong>{symbol}</strong>}
          </span>
        </div>
        {title ? (
          <p
            style={{
              fontSize: 12,
              margin: '8px 0px 0px 0px',
              textAlign: 'center',
              lineHeight: 1.25,
            }}
          >
            {name}
          </p>
        ) : null}
      </div>
    )
  },
)

export default AppLogo
