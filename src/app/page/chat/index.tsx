import { useCallback, useEffect, useState, useMemo } from 'react'
import moment from 'moment'
import nacl from 'tweetnacl'
import util from 'tweetnacl-util'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Input, Row, Button, Typography, Card, Space, Modal } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import FindUser from './findUser'

import {
  decryptingMessage,
  decryptKey,
  encryptingMessage,
  encryptKey,
  MessageEncrypt,
} from 'app/page/key'
import 'antd/dist/antd.css'
import CopyPublicKey from './copyPub'
import { fetchNewMessages, Message } from 'app/model/chat.controller'
import { AppState } from 'app/model'
import { db, TOPIC } from 'app/constants'
import storage from 'shared/storage'
import { useWallet } from '@senhub/providers'
import HeaderChat from './header'

export type MessageData = MessageEncrypt & {
  owner: string
}

export type KeyEncrypt = {
  sk: string
  pk: string
}
export type KeyReceive = {
  address: string
  publicKey: string
}
const GunChat = () => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const [formChat, setFormChat] = useState('')
  const [receiver, setReceiver] = useState('')
  const [receiverPK, setReceiverPK] = useState<any>()
  const [chat, setChat] = useState(false)
  const [mySecretKey, setMySecretKey] = useState('')
  const [myPublicKey, setMyPublicKey] = useState('')
  const [existed, setExisted] = useState(false)
  const [keyPair, setKeyPair] = useState<KeyEncrypt>()
  const [topic, setTopic] = useState(walletAddress)
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [messRequest, setMessRequest] = useState('')
  const [listPubKey, setListPubKey] = useState<KeyReceive[]>([])
  const { messages } = useSelector((state: AppState) => state.chat)

  const dispatch = useDispatch()

  const signUpToChat = useCallback(async () => {
    const wallet = window.sentre.wallet
    if (!wallet) throw new Error('Please connect wallet')
    if (!password)
      return window.notify({
        type: 'error',
        description: 'Please enter password',
      })

    const { signature } = await wallet.signMessage(
      `start Conversation with password: ${password}`,
    )
    if (!signature) return

    const secretKey = Buffer.from(signature.substring(0, 32))

    setChat(true)
    setExisted(true)
    const keypair = nacl.box.keyPair.fromSecretKey(secretKey)
    const pk = util.encodeBase64(keypair.publicKey)
    const sk = util.encodeBase64(keypair.secretKey)

    const encryptKeyPair: KeyEncrypt = {
      pk: encryptKey(password, pk),
      sk: encryptKey(password, sk),
    }
    storage.set('keypair', encryptKeyPair)
    setMyPublicKey(pk)
    setMySecretKey(sk)
  }, [password])

  const sharedKey = useMemo(() => {
    if (!receiverPK || !mySecretKey) return
    try {
      const receiverDecode = util.decodeBase64(receiverPK)
      const secretKeyDecode = util.decodeBase64(mySecretKey)
      return nacl.box.before(receiverDecode, secretKeyDecode)
    } catch (err: any) {
      setReceiver('')
      window.notify({
        type: 'error',
        description: "Receiver's Public key wrong",
      })
    }
  }, [receiverPK, mySecretKey])

  const getMessage = useCallback(async () => {
    const messages = db.get(topic)

    // ** get public key when connect with another people**
    if (topic === walletAddress) {
      const keys: string[] = []
      const keysReceived: KeyReceive[] = []

      await messages.map().once(async (data, id) => {
        if (!data || !data.owner) return
        try {
          if (data.owner === walletAddress && data.sendTo) {
            const address = data.sendTo as string
            keys.push(address)
          }
        } catch (er) {
          console.log(er)
        }
      })
      await messages.map().once(async (data, id) => {
        if (!data || !data.owner) return
        try {
          if (data.owner !== walletAddress) {
            if (!keys.includes(data.owner)) {
              setVisible(true)
              setMessRequest(data.chat)
              setReceiverPK(data.publicKey)
              setReceiver(data.owner)
            } else {
              keysReceived.push({
                publicKey: data.publicKey,
                address: data.owner,
              })
              setTimeout(() => {
                setListPubKey(keysReceived)
              }, 1000)
            }
          }
        } catch (er) {
          console.log(er)
        }
      })
    } else if (topic === receiver) {
      messages.map().once(async (data, id) => {
        if (!data) return
        try {
          console.log(data)
          if (data.owner === receiver && data.sendTo === walletAddress) {
            setReceiverPK(data.publicKey)
            setTopic(TOPIC)
          }
        } catch (er) {
          console.log(er)
        }
      })
    } else {
      messages.map().once(async (data, id) => {
        if (!data || !sharedKey) return
        try {
          const text = decryptingMessage(data, sharedKey) || ''
          if (!text) return
          const createdAt = id
          const message: Message = {
            text,
            createdAt,
            owner: data.owner,
          }
          dispatch(fetchNewMessages({ message }))
        } catch (er) {
          console.log(er)
        }
      })
    }
  }, [dispatch, receiver, sharedKey, topic, walletAddress])

  const startChat = useCallback(() => {
    if (!keyPair || !password) return

    const parsePk = decryptKey(password, keyPair.pk)
    const parseSK = decryptKey(password, keyPair.sk)
    if (!parsePk || !parseSK)
      return window.notify({ type: 'error', description: 'Password wrong' })
    setMyPublicKey(parsePk)
    setMySecretKey(parseSK)

    return setChat(true)
  }, [keyPair, password])

  const fetchKey = useCallback(() => {
    const keypair: KeyEncrypt = storage.get('keypair')
    if (keypair) {
      setExisted(true)
      return setKeyPair(keypair)
    }
    return setExisted(false)
  }, [])

  const sendMessage = async () => {
    if (!sharedKey) return
    const messageEncrypted = encryptingMessage(formChat, sharedKey)
    const id = new Date().toISOString()
    const message = db
      .get('messages')
      .set({ ...messageEncrypted, owner: walletAddress })

    db.get(topic).get(id).put(message)

    setFormChat('')
  }

  const acceptChat = async () => {
    const id = new Date().toISOString()
    const message = db
      .get('messages')
      .set({ publicKey: myPublicKey, owner: walletAddress, sendTo: receiver })
    await db.get(topic).get(id).put(message)
    /**Get History */
    await db.get(receiver).get(id).put(message)
    await setTopic(TOPIC)
    return setVisible(false)
  }

  const rejectChat = () => {
    setReceiverPK('')
    setMessRequest('')
    setReceiver('')
    setTopic('')
    return setVisible(false)
  }

  const requestChat = async () => {
    const id = new Date().toISOString()
    const chat = formChat
    const message = db.get('messages').set({
      chat,
      publicKey: myPublicKey,
      owner: walletAddress,
      sendTo: receiver,
    })
    db.get(topic).get(id).put(message)
    return setFormChat('')
  }

  const stopChat = () => {
    setChat(false)
    setPassword('')
  }

  const startToChat = (receiver: string) => {
    setReceiver(receiver)
    setTopic(receiver)
  }

  useEffect(() => {
    ;(async () => {
      if (!chat) return
      await getMessage()
    })()
  }, [chat, getMessage])

  useEffect(() => {
    fetchKey()
  }, [fetchKey])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
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
        {/* <HeaderChat chat={chat} setChat={setChat}/> */}
      </Col>
      {chat && (
        <Col span={24}>
          <Card bordered={false}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <CopyPublicKey pubKey={myPublicKey || ''} />
              </Col>
              <Col span={24}>
                <FindUser
                  receiver={receiver}
                  setUser={setReceiver}
                  setTopic={setTopic}
                />
              </Col>
              <Col span={24}>
                <Card
                  style={{
                    height: 'calc(100vh - 350px)',
                    overflow: 'auto',
                    background: '#f1f9f9',
                    boxShadow: 'unset',
                  }}
                  bordered={false}
                >
                  {receiver ? (
                    <Row gutter={[16, 16]}>
                      {messages.map((mess, index) => {
                        return (
                          <Col span={24} key={index}>
                            <Row
                              gutter={[16, 16]}
                              justify={
                                walletAddress === mess.owner ? 'end' : 'start'
                              }
                            >
                              <Col span={14}>
                                <Card
                                  bordered={false}
                                  style={{
                                    boxShadow: '0 0 15px #dadada',
                                    borderRadius: 12,
                                    backgroundColor:
                                      walletAddress === mess.owner
                                        ? '#69CCFA'
                                        : '#ffff',
                                  }}
                                  bodyStyle={{ padding: '8px 12px' }}
                                >
                                  <Space direction="vertical" size={0}>
                                    <Space>
                                      {/* {avatar(mess.owner)} */}
                                      <Typography.Text>
                                        {mess.text}
                                      </Typography.Text>
                                    </Space>
                                    <Typography.Text type="secondary">
                                      <Space>
                                        <Typography.Text
                                          type="secondary"
                                          style={{ fontSize: 12 }}
                                        >
                                          Time:
                                        </Typography.Text>
                                        <Typography.Text
                                          type="secondary"
                                          style={{ fontSize: 12 }}
                                        >
                                          {moment(mess.createdAt).format(
                                            'YYYY-MM-DD HH:MM:ss',
                                          )}
                                        </Typography.Text>
                                      </Space>
                                    </Typography.Text>
                                  </Space>
                                </Card>
                              </Col>
                            </Row>
                          </Col>
                        )
                      })}
                    </Row>
                  ) : (
                    <Row gutter={[24, 24]}>
                      {listPubKey.map((key) => (
                        <Col span={24} key={key.address}>
                          <Space>
                            {key.address}
                            <Button onClick={() => startToChat(key.address)}>
                              Start Chat
                            </Button>
                          </Space>
                        </Col>
                      ))}
                    </Row>
                  )}
                </Card>
              </Col>
              {receiver && (
                <Col span={24}>
                  <Input
                    name="text"
                    value={formChat}
                    onChange={(e) => setFormChat(e.target.value)}
                    placeholder="Enter message"
                    size="large"
                    onPressEnter={
                      topic === receiver ? requestChat : sendMessage
                    }
                    suffix={
                      <Button
                        type="text"
                        size="small"
                        onClick={topic === receiver ? requestChat : sendMessage}
                        icon={<SendOutlined />}
                      />
                    }
                    style={{ borderRadius: 8 }}
                  />
                </Col>
              )}
            </Row>
          </Card>
        </Col>
      )}
      <Modal visible={visible}>
        <Row gutter={[24, 24]} justify="center">
          <Col span={24}>User A want to chat with u</Col>
          <Col span={24}>{messRequest}</Col>
          <Col span={24}>
            <Space>
              <Button onClick={acceptChat}>Yes</Button>
              <Button onClick={rejectChat}>No</Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </Row>
  )
}

export default GunChat
