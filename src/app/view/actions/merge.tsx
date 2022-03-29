import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { AppState } from 'app/model'
import { TransferData, setData } from 'app/model/main.controller'
import { toBigInt } from 'app/lib/utils'

export type MergeProps = {
  disabled?: boolean
}

const Merge = ({ disabled = false }: MergeProps) => {
  const dispatch = useDispatch()
  const {
    main: { data },
  } = useSelector((state: AppState) => state)

  // Merge duplicated addresses (must call when no error)
  const merge = useCallback(async () => {
    const nextData = [] as TransferData
    for (const [address, amount] of data) {
      const index = nextData.findIndex(([addr]) => addr === address)
      if (index >= 0) {
        nextData[index][1] = (
          toBigInt(nextData[index][1]) + toBigInt(amount)
        ).toString()
      } else {
        nextData.push([address, amount])
      }
    }
    await dispatch(setData(nextData))
  }, [data, dispatch])

  return (
    <Button
      type="text"
      icon={<IonIcon name="git-merge-outline" />}
      onClick={merge}
      disabled={disabled}
      block
    >
      Merge
    </Button>
  )
}

export default Merge
