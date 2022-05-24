import {
  CSSProperties,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from 'react'
import LazyLoad, { forceCheck } from '@senswap/react-lazyload'

import { Button, Col, Empty, Input, Modal, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import MintTag from './mintTag'
import MintCard from './mintCard'
import LoadMore from './loadMore'

import { useRecommendedMint } from './useRecommendedMint'
import { useSearchedMintAddresses } from './useSearchedMintAddresses'
import useSortMints from 'shared/hooks/useSortMints'

const LIMIT = 20
const AMOUNT_BEFORE_LOAD_MORE = 5

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
  const [offset, setOffset] = useState(LIMIT)
  const { recommendedMints, selectMint } = useRecommendedMint()
  const { searchedMintAddresses, loading } = useSearchedMintAddresses(keyword)
  const { sortedMints } = useSortMints(searchedMintAddresses)

  const onSelect = useCallback(
    (mintAddress: string) => {
      setVisible(false)
      onChange(mintAddress)
      selectMint(mintAddress)
    },
    [onChange, selectMint],
  )

  useEffect(() => {
    setOffset(LIMIT)
    setTimeout(() => {
      const list = document.getElementById('sentre-token-selection-list')
      if (list) list.scrollTop = 0
      forceCheck()
    }, 500)
  }, [keyword, visible])

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
          {!keyword.length && (
            <Col span={24}>
              <Row gutter={[8, 8]}>
                {recommendedMints.map((mintAddress) => (
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
              {sortedMints.length ? (
                sortedMints.slice(0, offset).map((mintAddress, index) => (
                  <Col span={24} key={mintAddress}>
                    <LazyLoad height={60} overflow>
                      <MintCard mintAddress={mintAddress} onClick={onSelect} />
                    </LazyLoad>
                    {index === offset - AMOUNT_BEFORE_LOAD_MORE && (
                      <LoadMore callback={() => setOffset(offset + LIMIT)} />
                    )}
                  </Col>
                ))
              ) : (
                <Col>
                  <Empty style={{ padding: 40 }} />
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default MintSelection
