import { openWindow } from 'common/utilities'
import { buttonReset } from 'components/buttons/button-reset'
import { tooltipBase } from 'components/tooltip/tooltip'

export const BufferShareButton = ({
  url,
  text,
  onShareWindowClose,
  children
}) => {
  const prepareWindow = (url, quote, callback) => {
    const opts = {
      name: 'buffer',
      height: 550,
      width: 750
    }
    const text = quote ? `&text=${quote}` : ''
    const link = `https://bufferapp.com/add?url=${encodeURIComponent(
      url
    )}${text}`
    openWindow(link, opts, callback)
  }

  const clickHandler = (e) => {
    e.preventDefault()
    prepareWindow(url, text, onShareWindowClose)
  }

  return (
    <button aria-label="Buffer" onClick={clickHandler}>
      {children}
    </button>
  )
}
