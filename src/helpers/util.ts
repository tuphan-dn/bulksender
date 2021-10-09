import randomColor from 'randomcolor'

export const randColor = (
  seed: string,
  luminosity: 'dark' | 'bright' | 'light' | 'random' | undefined = 'dark',
  hue?: string | undefined,
) => {
  return randomColor({ luminosity, hue, seed })
}

export const normalizeAppName = (appName: string): string => {
  if (!appName) throw new Error('Application name is empty')
  if (typeof appName !== 'string') throw new Error('Application name is empty')
  return appName.replace(/ /g, '_').toLowerCase()
}

export const isTouchable = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export const asyncWait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const openNewTab = (href: string) => {
  return window.open(href, '_blank')
}
