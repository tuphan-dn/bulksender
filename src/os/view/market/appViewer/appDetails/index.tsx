import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { Row, Col, Typography, Space, Grid } from 'antd'
import Paragraph from 'antd/lib/typography/Paragraph'
import AppIcon from 'os/components/appIcon'
import AppInstall from './appInstall'
import AppTags from './appTags'
import AppAuthor from './appAuthor'
import AppReadMe from './appReadMe'

import { RootState } from 'os/store'
import AppShare from './appShare'

const AppDetails = ({ appId }: { appId: string }) => {
  const { register } = useSelector((state: RootState) => state.page)
  const { address } = useSelector((state: RootState) => state.wallet)
  const { appIds } = useSelector((state: RootState) => state.page)
  const { description, author, name } = register[appId] || {}
  const { md, sm, xs } = Grid.useBreakpoint()
  const isMobile = xs || (sm && !md)

  const floatSocialButton = () => {
    if (isMobile) return 'start'
    return 'end'
  }

  const installed = useMemo(() => {
    return account.isAddress(address) && appIds.includes(appId)
  }, [address, appIds, appId])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col span={isMobile ? 24 : 12}>
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
          <Col span={isMobile ? 24 : 12}>
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
        <AppAuthor author={author} />
      </Col>
      <Col span={24}>
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'More' }}>
          {description}
        </Paragraph>
      </Col>
    </Row>
  )
}

export default AppDetails
