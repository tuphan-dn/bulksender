import { useState } from 'react'

import { Space, Modal, Button } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import AppReadme from 'os/components/appReadme'

const ReadMe = ({ appId }: { appId: string }) => {
  const [visible, setVisible] = useState(false)

  return (
    <Space>
      <Button
        type="text"
        className="btn-icon"
        icon={<IonIcon name="reader" onClick={() => setVisible(true)} />}
      />
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        title="Readme"
        closeIcon={<IonIcon name="close" />}
        bodyStyle={{
          maxHeight: '70vh',
          overflow: 'auto',
        }}
        footer={null}
        centered
      >
        <AppReadme appId={appId} />
      </Modal>
    </Space>
  )
}

export default ReadMe
