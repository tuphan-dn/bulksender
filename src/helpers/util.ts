export const isTouchable = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export const asyncWait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const openNewTab = (href: string) => {
  return window.open(href, '_blank')
}
