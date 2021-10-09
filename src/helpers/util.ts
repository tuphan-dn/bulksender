import randomColor from 'randomcolor'

const util = {
  randomColor: (
    seed: string,
    luminosity: 'dark' | 'bright' | 'light' | 'random' | undefined = 'dark',
    hue?: string | undefined,
  ) => {
    return randomColor({ luminosity, hue, seed })
  },

  normalizeAppName: (appName: string): string => {
    if (!appName) throw new Error('Application name is empty')
    if (typeof appName !== 'string')
      throw new Error('Application name is empty')
    return appName.replace(/ /g, '_').toLowerCase()
  },

  isTouchable: () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  },

  asyncWait: (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  },

  openNewTab: (href: string) => {
    return window.open(href, '_blank')
  },
}

export default util
