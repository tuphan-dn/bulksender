export type Env = 'development' | 'staging' | 'production'
const env: Env = (process.env.REACT_APP_ENV as Env) || 'development'
export default env
