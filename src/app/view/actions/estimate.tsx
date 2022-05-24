import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import configs from 'app/configs'
import { AppDispatch, AppState } from 'app/model'
import { asyncWait } from 'shared/util'
import { setStatus, Status, TransferData } from 'app/model/main.controller'
import Bulksender from 'app/lib'
import { toBigInt } from 'app/lib/utils'

const {
  sol: { spltAddress, splataAddress, bulksenderAddress, node, taxman, fee },
} = configs

export type EstimateProps = {
  onChange: (bulk: TransferData[]) => void
  disabled?: boolean
}

const Estimate = ({ disabled = false, onChange = () => {} }: EstimateProps) => {
  const [progress, setProgess] = useState(0)
  const [bulk, setBulk] = useState<TransferData[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: AppState) => state.main.data)
  const mintAddress = useSelector((state: AppState) => state.main.mintAddress)
  const status = useSelector((state: AppState) => state.main.status)

  // Compute bulk
  const computeBulk = useCallback(async () => {
    const {
      sentre: { wallet },
    } = window
    if (!wallet) return setBulk([])

    await dispatch(setStatus(Status.Estimating))

    const bulksender = new Bulksender(
      bulksenderAddress,
      spltAddress,
      splataAddress,
      node,
    )
    let currentData = [...data]
    const newBulks: TransferData[] = [[]]
    while (currentData.length) {
      const [address, amount] = currentData.shift() as [string, string]
      const latestBulk = newBulks[newBulks.length - 1]
      const simulatedBulk: TransferData = [...latestBulk, [address, amount]]
      await asyncWait(250) // Avoid too many requests
      let ok = false
      try {
        ok = await bulksender.simulateBulkTransfer(
          simulatedBulk.map(([_, amount]) => toBigInt(amount)),
          simulatedBulk.map(([address, _]) => address),
          mintAddress,
          wallet,
          fee,
          taxman,
        )
      } catch (er) {
        ok = false
      }
      // There is a failed record
      if (!ok && simulatedBulk.length <= 1) {
        setBulk([])
        window.notify({
          type: 'error',
          description:
            'Cannot handle the transaction. Make sure that your SOL balance is enough to pay fees.',
        })
        return dispatch(setStatus(Status.None))
      }
      // Keep moving
      if (ok) newBulks[newBulks.length - 1] = simulatedBulk
      else newBulks.push([[address, amount]])
      // Progress
      setProgess(newBulks.flat().length / data.length)
    }
    setBulk(newBulks)
    return dispatch(setStatus(Status.Estimated))
  }, [data, dispatch, mintAddress])

  useEffect(() => {
    onChange(bulk)
    return () => setProgess(0)
  }, [bulk, onChange])

  return (
    <Button
      type="primary"
      icon={<IonIcon name="send" />}
      onClick={computeBulk}
      disabled={disabled}
      loading={status === Status.Estimating}
      block
    >
      Optimize {Math.floor(progress * 100)}%
    </Button>
  )
}

export default Estimate
