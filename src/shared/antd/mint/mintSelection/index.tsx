import {
  CSSProperties,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from 'react'
import LazyLoad, { forceCheck } from '@senswap/react-lazyload'
import { account } from '@senswap/sen-js'

import {
  Button,
  Col,
  Divider,
  Input,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import MintTag from './mintTag'
import MintCard from './mintCard'

import { useRecommendedMintAddresses } from './useRecommendedMintAddresses'
import { useSearchedMintAddresses } from './useSearchedMintAddresses'
import { useRandomMintAddresses } from './useRandomMintAddress'

const LIMIT = 50

export type MintSelectionProps = {
  value: string
  onChange: (value: string) => void
  style?: CSSProperties
}

const MintSelection = ({ value, onChange, style = {} }: MintSelectionProps) => {
  const [visible, setVisible] = useState(false)
  const [keyword, setKeyword] = useState('')
  const recommendedMintAddresses = useRecommendedMintAddresses()
  const { searchedMintAddresses, loading } = useSearchedMintAddresses(keyword)
  const { randomHundredAddresses, refresh } = useRandomMintAddresses(LIMIT)

  const onSelect = useCallback(
    (mintAddress: string) => {
      setVisible(false)
      onChange(mintAddress)
    },
    [onChange],
  )
  const onRefresh = useCallback(() => {
    const list = document.getElementById('sentre-token-selection-list')
    if (list) list.scrollTop = 0
    return refresh()
  }, [refresh])

  useEffect(() => {
    forceCheck()
  }, [searchedMintAddresses])

  useEffect(() => {
    if (!visible) setKeyword('')
  }, [visible])

  return (
    <Fragment>
      <Button
        type="text"
        onClick={() => setVisible(true)}
        style={{ padding: 4, ...style }}
      >
        <Space>
          <MintAvatar mintAddress={value} />
          <MintSymbol mintAddress={value} />
          <IonIcon name="chevron-down-outline" />
        </Space>
      </Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        closeIcon={<IonIcon name="close-outline" />}
        centered
        destroyOnClose
      >
        <Row gutter={[32, 32]}>
          <Col span={24}>
            <Typography.Title level={5} type="secondary">
              Token Selection
            </Typography.Title>
          </Col>
          <Col span={24}>
            <Input
              placeholder="Search token symbol, name, address, ..."
              suffix={
                <Button
                  type="text"
                  style={{ marginRight: -7 }}
                  icon={
                    <IonIcon
                      name={keyword ? 'close-outline' : 'search-outline'}
                    />
                  }
                  onClick={keyword ? () => setKeyword('') : () => {}}
                  loading={loading}
                />
              }
              value={keyword}
              onChange={(e) => setKeyword(e.target.value || '')}
            />
          </Col>
          <Col span={24}>
            <Row gutter={[8, 8]}>
              {account.isAddress(value) ? (
                <Col>
                  <MintTag mintAddress={value} active />
                </Col>
              ) : null}
              {recommendedMintAddresses
                .filter((mintAddress) => mintAddress !== value)
                .map((mintAddress) => (
                  <Col key={mintAddress}>
                    <MintTag mintAddress={mintAddress} onClick={onSelect} />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col span={24}>
            <Row
              gutter={[8, 8]}
              style={{ maxHeight: 360 }}
              className="scrollbar"
              id="sentre-token-selection-list"
            >
              {(searchedMintAddresses || randomHundredAddresses).map(
                (mintAddress) => (
                  <Col span={24} key={mintAddress}>
                    <LazyLoad height={60} overflow>
                      <MintCard mintAddress={mintAddress} onClick={onSelect} />
                    </LazyLoad>
                  </Col>
                ),
              )}
              {!searchedMintAddresses ? (
                <Fragment>
                  <Col span={24}>
                    <Divider style={{ marginBottom: 0 }} />
                  </Col>
                  <Col span={24}>
                    <Typography.Text type="secondary" className="caption">
                      <IonIcon
                        name="chatbox-ellipses-outline"
                        style={{ marginRight: 6 }}
                      />
                      This is the list of {LIMIT} random tokens while the full
                      list is pretty longer. You can find your tokens by the
                      search bar. Or{' '}
                      <Typography.Link onClick={onRefresh}>
                        Click here
                      </Typography.Link>{' '}
                      to refresh the current list.
                    </Typography.Text>
                  </Col>
                </Fragment>
              ) : null}
            </Row>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default MintSelection
