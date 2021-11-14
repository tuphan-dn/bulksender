import { useSelector } from 'react-redux'

import { Card } from 'antd'
import ReactJson from 'react-json-view'

import { RootState } from 'os/store'

const JsonViewer = ({ value = {} }: { value?: object }) => {
  const { theme } = useSelector((state: RootState) => state.ui)

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
