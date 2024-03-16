export function openWindow(url, { name = '_blank', height = 400, width = 550, ...opts }, callback) {
  const left = window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2
  const top = window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2

  const config = {
    height,
    width,
    left,
    top,
    location: 'no',
    toolbar: 'no',
    status: 'no',
    directories: 'no',
    menubar: 'no',
    scrollbars: 'yes',
    centerscreen: 'yes',
    chrome: 'yes',
    ...opts
  }

  const shareDialog = window.open(
    url,
    name,
    Object.keys(config)
      .map((key) => `${key}=${config[key]}`)
      .join(', ')
  )

  if (callback) {
    const interval = window.setInterval(() => {
      try {
        if (shareDialog === null || shareDialog.closed) {
          window.clearInterval(interval)
          callback(shareDialog)
        }
      } catch (e) {
        console.error(e)
      }
    }, 1000)
  }

  return shareDialog
}
