import configs from 'configs'

type Sanitizer = {
  payload: any
  type: string
}

// Bugfix: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/Troubleshooting.md#excessive-use-of-memory-and-cpu
const devTools = (appName: string = 'SenOS'): any => {
  if (configs.env !== 'development') return false
  return {
    name: appName,
    actionSanitizer: ({ payload, type }: Sanitizer) => ({ payload, type }),
  }
}

export default devTools
