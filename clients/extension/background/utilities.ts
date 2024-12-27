export function isSystemLink(link: string) {
  return (
    link.startsWith('chrome://') ||
    link.startsWith('chrome-extension://') ||
    link.startsWith('chrome-search://')
  )
}
