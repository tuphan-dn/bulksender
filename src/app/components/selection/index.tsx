import { useState, Fragment, ReactNode } from 'react'

import { Typography, Space } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import MintSelection from './mintSelection'

import './index.less'

const Selection = ({
  selectedMint,
  mints = [],
  onChange = () => {},
  mintLabel,
  mintAvatar,
}: {
  selectedMint: string
  mints?: string[]
  onChange?: (mint: string) => void
  mintLabel?: ReactNode
  mintAvatar?: ReactNode
}) => {
  const [visible, setVisible] = useState(false)

  const onSelection = (selectedMint: string) => {
    if (onChange) onChange(selectedMint)
    return setVisible(false)
  }

  return (
    <Fragment>
      {/* Mint selected */}

      <Space
        className="mint-select"
        onClick={() => setVisible(mints.length > 0)}
      >
        {mintAvatar || <MintAvatar mintAddress={selectedMint} />}
        {mintLabel || (
          <Fragment>
            <Typography.Text type="secondary">
              <MintSymbol mintAddress={selectedMint} />
            </Typography.Text>
            {mints.length ? (
              <Typography.Text type="secondary">
                <IonIcon name="chevron-down-outline" />
              </Typography.Text>
            ) : null}
          </Fragment>
        )}
      </Space>

      {/* Modal select tokens */}
      {visible && (
        <MintSelection
          selectedMint={selectedMint}
          visible={visible}
          onChange={onSelection}
          mints={mints}
          onClose={() => setVisible(false)}
        />
      )}
    </Fragment>
  )
}

export default Selection
