import { TooltipRenderProps } from 'react-joyride'

const Tooltip = ({
  index,
  step,
  tooltipProps,
  skipProps,
}: TooltipRenderProps) => {
  return (
    <div
      key={index}
      {...tooltipProps}
      style={{
        background: '#F4F4F5',
        padding: 24,
        borderRadius: 16,
        width: 360,
      }}
    >
      {step.title && (
        <div style={{ color: '#212433', fontWeight: 700, fontSize: 20 }}>
          {step.title}
        </div>
      )}
      <div
        style={{
          fontWeight: 400,
          fontSize: 14,
          color: '#212433',
          marginTop: 8,
          marginBottom: 24,
        }}
      >
        {step.content}
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
          {Array.from({ length: 4 }, (_, i) => i + 1).map((item) => (
            <div
              style={{
                width: `${item === index + 1 ? 20 : 12}`,
                height: 4,
                background: `${item === index + 1 ? '#F9575E' : '#FEDDDF'}`,
                margin: '0px 4px',
                borderRadius: 8,
              }}
            />
          ))}
        </div>
        <div {...skipProps} id="skip" style={{ cursor: 'pointer' }}>
          Skip
        </div>
      </div>
    </div>
  )
}

export default Tooltip
