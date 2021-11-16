import { useState } from 'react'

import { Space, Modal, Button } from 'antd'

import IonIcon from 'shared/ionicon'

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
        bodyStyle={{ height: '70vh', overflow: 'auto' }}
        footer={null}
        centered
      >
        {appId}
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also
      </Modal>
    </Space>
  )
}

export default ReadMe
