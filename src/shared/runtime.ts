import storage from 'shared/storage'

export type Env = 'development' | 'staging' | 'production'
export const env: Env = (process.env.REACT_APP_ENV as Env) || 'development'

export type Net = 'devnet' | 'testnet' | 'mainnet'
export const net: Net = (storage.get('network') as Net) || 'devnet'
