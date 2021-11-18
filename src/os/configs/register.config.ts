import { Env } from 'shared/runtime'

if (
  typeof process.env.REACT_APP_ID !== 'string' ||
  typeof process.env.REACT_APP_URL !== 'string' ||
  typeof process.env.REACT_APP_SENHUB !== 'string'
)
  throw new Error('Please add REACT_APP_ID, REACT_APP_URL in .env!')

/**
 * Contructor
 */

type Conf = {
  extra: SenHubRegister
  senreg: string
}

const devApp = {
  [process.env.REACT_APP_ID]: {
    url: `${process.env.REACT_APP_URL}/index.js`,
    appId: process.env.REACT_APP_ID,
    name: 'My App',
    author: {
      name: 'Sentre',
      email: 'hi@sentre.io',
    },
    tags: ['solana', 'dapps'],
    description: 'A sample project for Sentre developers',
    verified: false,
  },
}

const conf: Record<Env, Conf> = {
  /**
   * Development configurations
   */
  development: {
    extra: devApp,
    senreg: 'https://descartesnetwork.github.io/senreg/register.json',
  },

  /**
   * Staging configurations
   */
  staging: {
    extra: devApp,
    senreg: 'https://descartesnetwork.github.io/senreg/register.json',
  },

  /**
   * Production configurations
   */
  production: {
    extra: {},
    senreg: 'https://descartesnetwork.github.io/senreg/register.json',
  },
}

/**
 * Module exports
 */
export default conf
