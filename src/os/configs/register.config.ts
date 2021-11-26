import { Env } from 'shared/runtime'

if (
  typeof process.env.REACT_APP_ID !== 'string' ||
  typeof process.env.REACT_APP_NAME !== 'string' ||
  typeof process.env.REACT_APP_URL !== 'string' ||
  typeof process.env.REACT_APP_SENHUB !== 'string'
)
  throw new Error(
    'Please add REACT_APP_ID, REACT_APP_NAME, REACT_APP_URL in .env.local!',
  )

/**
 * Contructor
 */

type Conf = {
  extra: SenReg
  senreg: string
}

const devApp = {
  [process.env.REACT_APP_ID]: {
    url: process.env.REACT_APP_URL,
    appId: process.env.REACT_APP_ID,
    name: process.env.REACT_APP_NAME,
    author: {
      name: process.env.REACT_APP_AUTHOR_NAME || '',
      email: process.env.REACT_APP_AUTHOR_EMAIL || '',
    },
    supportedViews: (process.env.REACT_APP_SUPPORTED_VIEWS || '')
      .split(',')
      .map((view) => view.trim())
      .filter((view) => ['page', 'widget'].includes(view)) as Array<
      'widget' | 'page'
    >,
    tags: (process.env.REACT_APP_TAGS || '')
      .split(',')
      .map((tag) => tag.trim()),
    description: process.env.REACT_APP_DESCRIPTION || '',
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
