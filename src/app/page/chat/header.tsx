import { Button, Input, Space } from 'antd'
import { Fragment, useState } from 'react'

export type HeaderProps = {
  chat: boolean
  stopChat: () => void
  setPassword: (e: any) => {}
  signUpToChat: () => {}
  startChat: () => void
  existed: boolean
}

const HeaderChat = ({
  chat,
  stopChat,
  setPassword,
  signUpToChat,
  startChat,
  existed,
}: HeaderProps) => {
  return (
    <Fragment>
      {chat ? (
        <Button onClick={stopChat}>Stop Conversation</Button>
      ) : (
        <Space size={20}>
          <Input
            type="password"
            placeholder="enter password"
            onChange={(e: any) => setPassword(e.target.value)}
          />
          {!existed ? (
            <Button onClick={signUpToChat}>Sign up</Button>
          ) : (
            <Button onClick={startChat}>Start chat</Button>
          )}
        </Space>
      )}
    </Fragment>
  )
}

export default HeaderChat
