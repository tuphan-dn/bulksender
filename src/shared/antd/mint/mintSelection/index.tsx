import {
  CSSProperties,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useWallet } from '@senhub/providers'
import LazyLoad, { forceCheck } from '@senswap/react-lazyload'

import {
  Button,
  Col,
  Divider,
  Empty,
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
import { useNoSearchMintAddresses } from './useNoSearchMintAddress'
import { createPDB } from 'shared/pdb'
import { net } from 'shared/runtime'
import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

const LIMIT = 50
const CACHE_LIMIT = 8

export type MintSelectionProps = {
  value: string
  onChange: (value: string) => void
  style?: CSSProperties
  disabled?: boolean
}

const MintSelection = ({
  value,
  onChange,
  style = {},
  disabled = false,
}: MintSelectionProps) => {
  const [visible, setVisible] = useState(false)
  const [keyword, setKeyword] = useState('')
  const {
    wallet: { address },
  } = useWallet()
  const { recommendedMintAddresses, setRecommendedMintAddresses } =
    useRecommendedMintAddresses()
  const { searchedMintAddresses, loading } = useSearchedMintAddresses(keyword)
  const { refresh } = useRandomMintAddresses(LIMIT)
  const sortedNoSearchAddress = useNoSearchMintAddresses()

  const validSearched = useMemo(
    () => !!keyword.length && !!searchedMintAddresses?.length,
    [keyword, searchedMintAddresses?.length],
  )
  const mints = !!keyword.length ? searchedMintAddresses : sortedNoSearchAddress

  const onSelect = useCallback(
    async (mintAddress: string) => {
      setVisible(false)
      onChange(mintAddress)
      const pdb = createPDB(address, appId)
      if (pdb) {
        const cachedMints: string[] =
          (await pdb.getItem(`${net}:recommended_token`)) || []
        if (
          cachedMints.length === 0 ||
          (cachedMints.length < CACHE_LIMIT &&
            !cachedMints.includes(mintAddress))
        ) {
          await pdb.setItem(`${net}:recommended_token`, [
            mintAddress,
            ...cachedMints,
          ])
          return setRecommendedMintAddresses([mintAddress, ...cachedMints])
        }
        if (!cachedMints.includes(mintAddress)) {
          cachedMints.pop()
          await pdb.setItem(`${net}:recommended_token`, [
            mintAddress,
            ...cachedMints,
          ])
          setRecommendedMintAddresses([mintAddress, ...cachedMints])
        }
      }
    },
    [address, onChange, setRecommendedMintAddresses],
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
        disabled={disabled}
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
          {!validSearched && (
            <Col span={24}>
              <Row gutter={[8, 8]}>
                {recommendedMintAddresses.map((mintAddress) => (
                  <Col xs={12} sm={8} md={6} key={mintAddress}>
                    <MintTag
                      mintAddress={mintAddress}
                      onClick={onSelect}
                      active={mintAddress === value}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          )}
          <Col span={24}>
            <Row
              gutter={[8, 8]}
              style={{ maxHeight: 360 }}
              className="scrollbar"
              id="sentre-token-selection-list"
              justify="center"
            >
              {mints?.length ? (
                mints.map((mintAddress) => (
                  <Col span={24} key={mintAddress}>
                    <LazyLoad height={60} overflow>
                      <MintCard mintAddress={mintAddress} onClick={onSelect} />
                    </LazyLoad>
                  </Col>
                ))
              ) : (
                <Col>
                  <Empty style={{ padding: 40 }} />
                </Col>
              )}
              {!validSearched && (
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
              )}
            </Row>
          </Col>
          {!validSearched}
        </Row>
      </Modal>
    </Fragment>
  )
}

export default MintSelection
