import { Select } from 'antd'

import { net } from 'shared/runtime'
import storage from 'shared/storage'

const NetSwitch = () => {
  const onSwitch = (value: string) => {
    storage.set('network', value)
    window.location.reload()
  }
  return (
    <Select defaultValue={net} onChange={onSwitch} size="small">
      <Select.Option value="devnet">Devnet</Select.Option>
      <Select.Option value="testnet">Testnet</Select.Option>
      <Select.Option value="mainnet">Mainnet</Select.Option>
    </Select>
  )
}

export default NetSwitch
