import { useState, forwardRef, useCallback } from 'react'

import { Tooltip, Space, InputNumber, InputNumberProps } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import './index.less'

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
    onValue = () => {},
    onChange = () => {},
    ...props
  }: InputNumberProps & {
    onValue?: (val: string) => void
    max?: string | number
  }) => {
    const [error, setError] = useState('')

    // Handle amount
    const onAmount = useCallback(
      (val: number) => {
        const onError = (er: string) => {
          if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = undefined
          }
          setError(er)
          timeoutId = setTimeout(() => setError(''), 500)
        }
        if (max && val > parseFloat(max.toString()))
          return onError('Not enough balance')
        return onValue(val.toString())
      },
      [max, onValue],
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
          type="number"
          controls={false}
          onChange={(value) => {
            if (value === null || typeof value === 'string') return
            onAmount(value)
          }}
        />
      </Tooltip>
    )
  },
)

export default NumericInput
