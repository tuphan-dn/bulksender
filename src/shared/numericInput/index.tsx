import React, { useState, forwardRef, useCallback, useRef } from 'react'

import { Input, Tooltip, Space } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

let timeoutId: ReturnType<typeof setTimeout> | undefined

const NumericInput = forwardRef(
  (
    {
      max,
      onChange,
      ...props
    }: { max?: string; onChange: (val: string) => void } & any,
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
        if (max && parseFloat(val) > parseFloat(max))
          return onError('Not enough balance')
        return onChange(val)
      },
      [max, onChange],
    )
    // Handle cursor
    innerRef?.current?.setSelectionRange(cursor, cursor)
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
