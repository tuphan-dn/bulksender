import { useSelector } from 'react-redux'

import { Row } from 'antd'
import { WidgetLoader } from 'os/components/widgetLoader'

import { RootState } from 'os/store'

const Dashboard = () => {
  const { widgetIds, register } = useSelector((state: RootState) => state.page)

  return (
    <Row gutter={[24, 24]}>
      {widgetIds.map((appId) => {
        if (!register[appId]) return null
        return (
          <WidgetLoader
            key={appId}
            {...(register[appId] as ComponentManifest)}
          />
        )
      })}
    </Row>
  )
}

export default Dashboard
