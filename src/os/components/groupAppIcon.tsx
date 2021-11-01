import { StaticLoader } from 'os/components/appLoader'

import register from 'senhub.register'

const GroupAppIcon = ({
  page,
  size = 64,
  onClick = () => {},
}: {
  page: string[]
  size: number
  onClick: () => void
}) => {
  const limit = page.length < 4 ? page.length : 4
  const subsize = (size - 12) / 2

  return (
    <div
      style={{
        height: size,
        width: size,
        borderRadius: 8,
        padding: 2,
        backgroundColor: '#cccccc',
        cursor: 'pointer',
        lineHeight: 0,
      }}
      onClick={onClick}
    >
      {Array.from(Array(limit).keys()).map((_, i) => (
        <StaticLoader
          key={i}
          type="logo"
          {...register[page[i]]}
          render={(src) => (
            <img
              src={src}
              style={{
                height: subsize,
                width: subsize,
                borderRadius: 4,
                margin: 2,
              }}
              alt={src}
            />
          )}
        />
      ))}
    </div>
  )
}

export default GroupAppIcon
