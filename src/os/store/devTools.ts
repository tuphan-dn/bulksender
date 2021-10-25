// Bugfix performance
// https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/Troubleshooting.md#excessive-use-of-memory-and-cpu
const devTools = (appName: string): any => {
  if ((process.env.REACT_APP_ENV || 'development') !== 'development')
    return false
  return {
    name: appName,
    actionSanitizer: ({ payload, type }: { payload: any; type: string }) => ({
      payload,
      type,
    }),
  }
}

export default devTools
