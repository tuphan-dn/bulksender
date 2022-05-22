import React, { useCallback, useEffect, useState } from 'react'
import { useMint } from '@senhub/providers'

import { Card, Input, Button } from 'antd'
import IonIcon from 'shared/antd/ionicon'

const KEYSIZE = 3

const Search = ({
  onChange,
  disabled = false,
  mints,
}: {
  onChange: (data: string[]) => void
  disabled?: boolean
  mints: string[]
}) => {
  const [keyword, setKeyword] = useState('')
  const { tokenProvider } = useMint()

  const search = useCallback(async () => {
    if (!keyword || keyword.length < KEYSIZE) return onChange(mints)
    const raw = await tokenProvider.find(keyword)
    const data = raw
      .filter(({ address }) => mints.includes(address))
      .map(({ address }) => address)
    // Search by address
    mints.forEach((mintAddress) => {
      if (data.includes(mintAddress)) return
      if (!mintAddress.toLowerCase().includes(keyword.toLowerCase())) return
      return data.push(mintAddress)
    })
    return onChange(data)
  }, [keyword, onChange, tokenProvider, mints])

  useEffect(() => {
    search()
  }, [search])

  return (
    <Card
      className="mint-search"
      bodyStyle={{ padding: 0 }}
      style={{ padding: 8 }}
      bordered={false}
    >
      <Input
        placeholder="Search"
        value={keyword}
        size="small"
        bordered={false}
        suffix={
          <Button
            type="text"
            style={{ marginRight: -7 }}
            size="small"
            onClick={keyword ? () => setKeyword('') : () => {}}
            icon={
              <IonIcon name={keyword ? 'close-outline' : 'search-outline'} />
            }
            disabled={disabled}
          />
        }
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setKeyword(e.target.value)
        }
        disabled={disabled}
      />
    </Card>
  )
}

export default Search
