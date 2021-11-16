import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { Row, Col, Typography, Space, Grid } from 'antd'
import AppIcon from 'os/components/appIcon'
import AppInstall from './appInstall'
import AppTags from './appTags'
import AppAuth from './appAuth'
import AppDescription from './appDescription'
import AppReadMe from './appReadMe'

import { RootState } from 'os/store'
import AppShare from './appShare'

const AppDetails = ({ appId }: { appId: string }) => {
  const { register } = useSelector((state: RootState) => state.page)
  const { address } = useSelector((state: RootState) => state.wallet)
  const { appIds } = useSelector((state: RootState) => state.page)
  const { description, author, name } = register[appId] || {}
  const { xl, lg, md } = Grid.useBreakpoint()

  const floatSocialButton = () => {
    if (xl || (!lg && md)) return 'end'
    return 'start'
  }

  const installed = useMemo(() => {
    return account.isAddress(address) && appIds.includes(appId)
  }, [address, appIds, appId])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={[16, 16]} wrap={!xl}>
          <Col flex="auto">
            <Row gutter={[32, 24]} wrap={false}>
              <Col>
                <AppIcon appId={appId} size={96} name={false} />
              </Col>
              <Col flex="auto">
                <Space direction="vertical" size={16}>
                  <Typography.Title level={2}>{name}</Typography.Title>
                  <AppTags />
                </Space>
              </Col>
            </Row>
          </Col>
          <Col flex="auto">
            <Row gutter={[16, 16]} justify={floatSocialButton()}>
              <Col span={24}>
                <AppInstall appId={appId} installed={installed} />
              </Col>
              <Col>
                <Space>
                  <AppShare appId={appId} />
                  <AppReadMe appId={appId} />
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <AppAuth author={author} />
      </Col>
      <Col span={24}>
        <AppDescription description={description} />
      </Col>
    </Row>
  )
}

export default AppDetails
