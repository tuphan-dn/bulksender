import { useState, forwardRef, useCallback } from 'react'

import { Tooltip, Space, InputNumber, InputNumberProps } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

let timeoutId: ReturnType<typeof setTimeout> | undefined

/**
 * Numeric Input
 * - Check balance based on the max
 * - Only accept numeric characters
 * @remarks The props of input follows the same as https://ant.design/components/input/#API. Extra & Overrided props
 * @param max - Maximum
 * @param onValue - A triggerred function if a valid number
 */
const NumericInput = forwardRef(
  ({
    max,
    onChange = () => {},
    ...props
  }: InputNumberProps & {
    onValue?: (val: string) => void
    max?: string | number
  }) => {
    const [error, setError] = useState('')

    // Handle amount
    const onAmount = useCallback(
      (val: number | string | null) => {
        if (val === null) return
        const onError = (er: string) => {
          if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = undefined
          }
          setError(er)
          timeoutId = setTimeout(() => setError(''), 500)
        }
        if (max && Number(val) > parseFloat(max.toString()))
          return onError('Not enough balance')
        return onChange(val.toString())
      },
      [max, onChange],
    )

    return (
      <Tooltip
        title={
          <Space>
            <IonIcon name="warning" />
            {error}
          </Space>
        }
        visible={!!error}
      >
        <InputNumber
          {...props}
          stringMode
          type="number"
          controls={false}
          onChange={onAmount}
        />
      </Tooltip>
    )
  },
)

export default NumericInput
