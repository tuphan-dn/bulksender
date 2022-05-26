import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import { Button } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import configs from 'app/configs'
import { AppState } from 'app/model'
import { explorer } from 'shared/util'
import { TransferData } from 'app/model/main.controller'
import Bulksender from 'app/lib'
import { toBigInt } from 'app/lib/utils'

const {
  sol: { spltAddress, splataAddress, bulksenderAddress, node, taxman, fee },
} = configs

export type SendProps = {
  bulk: TransferData[]
  disabled: boolean
}

const Send = ({ bulk = [], disabled = false }: SendProps) => {
  const [loading, setLoading] = useState(false)
  const mintAddress = useSelector((state: AppState) => state.main.mintAddress)

  // Send a bulk
  const send = useCallback(async () => {
    setLoading(true)
    const bulksender = new Bulksender(
      bulksenderAddress,
      spltAddress,
      splataAddress,
      node,
    )
    for (const transferData of bulk) {
      try {
        const {
          sentre: { wallet },
        } = window
        if (!wallet) return
        const { txId } = await bulksender.checkedBulkTransfer(
          transferData.map(([_, amount]) => toBigInt(amount)),
          transferData.map(([address, _]) => address),
          mintAddress,
          wallet,
          fee,
          taxman,
        )
        window.notify({
          type: 'success',
          description: 'Successfully transfer tokens. Click to view details.',
          onClick: () => window.open(explorer(txId), '_blank'),
        })
      } catch (er: any) {
        window.notify({ type: 'error', description: er.message })
      }
    }
    return setLoading(false)
  }, [bulk, mintAddress])

  return (
    <Button
      type="primary"
      icon={<IonIcon name="send" />}
      onClick={send}
      disabled={disabled}
      loading={loading}
      block
    >
      Send
    </Button>
  )
}

export default Send
