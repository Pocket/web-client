import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearAllToasts } from 'connectors/toasts/toast.state'
import { Toast } from './toast'
import { css } from '@emotion/css'

export const toastStyle = css`
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: var(--zIndexModal);
`

export const Toasts = () => {
  const dispatch = useDispatch()

  const toasts = useSelector((state) => state.toasts)

  useEffect(() => {
    dispatch(clearAllToasts())
  }, [dispatch])

  return (
    <div className={toastStyle}>
      {toasts.map((toast) => (
        <Toast {...toast} key={toast.stamp} />
      ))}
    </div>
  )
}
