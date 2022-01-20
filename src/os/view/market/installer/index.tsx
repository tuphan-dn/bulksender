import { useHistory } from 'react-router-dom'

import { Col, Modal, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import CustomAppIcon from './customAppIcon'

import { RootState, useRootDispatch, useRootSelector } from 'os/store'
import { closeModalInstall } from 'os/store/search.reducer'

const Installer = () => {
  const {
    page: { register },
    search: { visible, prevAppId, currentAppId },
  } = useRootSelector((state: RootState) => state)
  const dispatch = useRootDispatch()
  const history = useHistory()

  const closeModal = () => {
    history.push(`/app/${prevAppId}`)
    dispatch(closeModalInstall())
  }

  return (
    <Modal
      title={null}
      closeIcon={<IonIcon name="close-outline" />}
      footer={null}
      onCancel={closeModal}
      visible={visible}
    >
      <Row gutter={[18, 18]}>
        <Col span={24}>
          <Typography.Title level={4}>
            You need to install this app
          </Typography.Title>
        </Col>
        <Col span={24}>
          <CustomAppIcon appId={currentAppId} />
        </Col>
        <Col />
        <Col span={24}>
          <Typography.Title level={4}>Related app</Typography.Title>
        </Col>
        <Col />
        <Row gutter={[26, 26]}>
          {Object.keys(register).map((appId) => {
            if (currentAppId === appId) return null
            return (
              <Col span={12} key={appId}>
                <CustomAppIcon appId={appId} />
              </Col>
            )
          })}
        </Row>
      </Row>
    </Modal>
  )
}

export default Installer
