export function isSystemLink(link: string) {
  return (
    link.startsWith('chrome://') ||
    link.startsWith('chrome-extension://') ||
    link.startsWith('chrome-search://')
  )
}

export function isSystemPage(tab?: chrome.tabs.Tab) {
  return tab && tab.active && tab.url && isSystemLink(tab.url)
}
