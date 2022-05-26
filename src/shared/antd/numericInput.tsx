import { ChangeEvent, useState, forwardRef, useCallback, useRef } from 'react'

import { Input, Tooltip, Space, InputProps } from 'antd'
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
  (
    {
      max,
      onValue = () => {},
      onChange = () => {},
      ...props
    }: InputProps & {
      onValue?: (val: string) => void
      max?: string | number
    },
    ref: any,
  ) => {
    const [error, setError] = useState('')
    const [cursor, setCursor] = useState<number | null>(null)
    const innerRef = useRef(ref)

    // Handle amount
    const onAmount = useCallback(
      (val: string) => {
        const onError = (er: string) => {
          if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = undefined
          }
          setError(er)
          timeoutId = setTimeout(() => setError(''), 500)
        }
        const reg = /^\d*(\.\d*)?$/
        if (!reg.test(val)) return onError('Invalid character')
        if (max && parseFloat(val) > parseFloat(max.toString()))
          return onError('Not enough balance')
        return onValue(val)
      },
      [max, onValue],
    )

    // Handle cursor jumping
    // To prevent autofocus on mobile, we must strictly check cursor different from null
    if (cursor !== null) innerRef?.current?.setSelectionRange(cursor, cursor)

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
        <Input
          {...props}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange(e)
            setCursor(e.target.selectionStart)
            onAmount(e.target.value || '')
          }}
          ref={innerRef}
        />
      </Tooltip>
    )
  },
)

export default NumericInput
