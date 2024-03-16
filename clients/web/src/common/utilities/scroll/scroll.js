export function getScrollTop() {
  const doc = document.documentElement
  return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
}

export function atEndOfScroll(buffer = 0) {
  const doc = document.scrollingElement || document.documentElement
  return doc.scrollHeight - doc.scrollTop <= doc.clientHeight + buffer
}
