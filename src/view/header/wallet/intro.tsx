import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { account, utils } from '@senswap/sen-js'
import numeral from 'numeral'

import { Space, Typography, Tooltip, Divider } from 'antd'
import IonIcon from 'components/ionicon'

import { explorer, shortenAddress } from 'helpers/util'
import { RootState } from 'store'

const WalletIntro = () => {
  const { address, lamports } = useSelector((state: RootState) => state.wallet)

  const balance = numeral(utils.undecimalize(lamports, 9)).format('0.[00]')

  if (!account.isAddress(address)) return <Fragment />
  return (
    <Space size={10}>
      <Typography.Link
        style={{ color: 'inherit', fontSize: 12 }}
        href={explorer(address)}
        target="_blank"
      >
        {shortenAddress(address, 3, '...')} <IonIcon name="open-outline" />
      </Typography.Link>
      <Divider type="vertical" style={{ margin: 0 }} />
      <Tooltip title={`${utils.undecimalize(lamports, 9)} SOL`}>
        <Typography.Text style={{ fontSize: 12 }}>
          {balance} <span style={{ color: '#03E1FF' }}>◎</span>
        </Typography.Text>
      </Tooltip>
    </Space>
  )
}

export default WalletIntro
