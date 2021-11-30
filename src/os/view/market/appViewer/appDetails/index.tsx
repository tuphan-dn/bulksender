import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { Row, Col, Typography, Space } from 'antd'
import Paragraph from 'antd/lib/typography/Paragraph'
import AppIcon from 'os/components/appIcon'
import BlueTick from 'os/components/blueTick'
import AppInstall from './appInstall'
import AppTags from './appTags'
import AppAuthor from './appAuthor'
import AppReadMe from './appReadMe'

import { RootState } from 'os/store'
import AppShare from './appShare'

const AppDetails = ({ appId }: { appId: string }) => {
  const { infix } = useSelector((state: RootState) => state.ui)
  const { register } = useSelector((state: RootState) => state.page)
  const { address } = useSelector((state: RootState) => state.wallet)
  const { appIds } = useSelector((state: RootState) => state.page)
  const { description, author, name, tags, verified } = register[appId] || {}

  const isMobile = infix === 'xs' || infix === 'sm'

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
          <Col span={isMobile ? 24 : 14}>
            <Row gutter={[32, 24]} wrap={false}>
              <Col>
                <AppIcon appId={appId} size={96} name={false} />
              </Col>
              <Col flex="auto">
                <Space direction="vertical" size={16}>
                  <Space align="center">
                    <Typography.Title level={2}>{name}</Typography.Title>
                    <BlueTick verified={verified} color="#18A0FB" />
                  </Space>
                  <AppTags tags={tags} />
                </Space>
              </Col>
            </Row>
          </Col>
          <Col span={isMobile ? 24 : 10}>
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
