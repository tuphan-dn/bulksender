import {
  ChangeEvent,
  CSSProperties,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from 'react'
import LazyLoad, { forceCheck } from '@senswap/react-lazyload'

import { Button, Col, Input, Modal, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import MintTag from './mintTag'
import MintCard from './mintCard'

import { useRecommendedMintAddresses } from './useRecommendedMintAddresses'
import { useSearchedMintAddresses } from './useSearchedMintAddresses'
import { useAllMintAddresses } from './useAllMintAddresses'
import { account } from '@senswap/sen-js'

export type MintSelectionProps = {
  value: string
  onChange: (value: string) => void
  style?: CSSProperties
}

const MintSelection = ({ value, onChange, style = {} }: MintSelectionProps) => {
  const [visible, setVisible] = useState(false)
  const [keyword, setKeyword] = useState('')
  const recommendedMintAddresses = useRecommendedMintAddresses()
  const allMintAddresses = useAllMintAddresses()
  const { searchedMintAddresses, loading } = useSearchedMintAddresses(keyword)

  const onSelect = useCallback(
    (mintAddress) => {
      setVisible(false)
      onChange(mintAddress)
    },
    [onChange],
  )

  useEffect(() => {
    forceCheck()
  }, [searchedMintAddresses])

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
      >
        <Row gutter={[36, 36]}>
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setKeyword(e.target.value || '')
              }
            />
          </Col>
          <Col span={24}>
            <Row gutter={[8, 8]}>
              {account.isAddress(value) ? (
                <Col>
                  <MintTag mintAddress={value} active />
                </Col>
              ) : null}
              {recommendedMintAddresses.map((mintAddress) => (
                <Col key={mintAddress}>
                  <MintTag mintAddress={mintAddress} onClick={onSelect} />
                </Col>
              ))}
            </Row>
          </Col>
          <Col span={24}>
            <Row
              gutter={[8, 8]}
              style={{ maxHeight: '45vh' }}
              className="scrollbar"
            >
              {(searchedMintAddresses || allMintAddresses).map(
                (mintAddress) => (
                  <Col span={24} key={mintAddress}>
                    <LazyLoad height={60} overflow>
                      <MintCard mintAddress={mintAddress} onClick={onSelect} />
                    </LazyLoad>
                  </Col>
                ),
              )}
            </Row>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default MintSelection
