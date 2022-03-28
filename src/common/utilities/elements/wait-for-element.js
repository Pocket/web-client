export function waitForElement(selector) {
  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        observer.disconnect()
        resolve(document.querySelector(selector))
      }
    })

    const observeConfig = { childList: true, subtree: true }
    observer.observe(document.body, observeConfig)
  })
}
