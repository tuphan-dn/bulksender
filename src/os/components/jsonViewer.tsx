import { Card } from 'antd'
import ReactJson from 'react-json-view'

import { useRootSelector, RootState } from 'os/store'

export type JsonViewerProps = { value?: object }

const JsonViewer = ({ value = {} }: JsonViewerProps) => {
  const {
    ui: { theme },
  } = useRootSelector((state: RootState) => state)

  return (
    <Card bordered={false}>
      <ReactJson
        src={value}
        style={{
          background: 'transparent',
          fontSize: 12,
          color: 'inherit',
        }}
        theme={theme === 'light' ? 'rjv-default' : 'flat'}
        iconStyle="circle"
        displayDataTypes={false}
        displayObjectSize={false}
        enableClipboard={false}
        indentWidth={2}
      />
    </Card>
  )
}

export default JsonViewer
