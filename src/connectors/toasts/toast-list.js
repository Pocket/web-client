import { useSelector } from 'react-redux'
import { Toast } from './toast'
import { css } from 'linaria'

const toastStyle = css`
  position: fixed;
  bottom: 50px;
  left: 50px;
  z-index: var(--zIndexModal);
`

export const Toasts = () => {
  const toasts = useSelector((state) => state.toasts)
  return (
    <div className={toastStyle}>
      {toasts.map((toast) => (
        <Toast {...toast} />
      ))}
    </div>
  )
}
