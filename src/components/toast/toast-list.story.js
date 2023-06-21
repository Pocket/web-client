import { useEffect, useState } from 'react'
import { Toast } from './toast'
import { toastStyle } from 'connectors/toasts/toast-list'
import { css } from '@emotion/css'

const styles = css``

export default {
  title: 'Components/ToastList',
  component: ToastList,
  argTypes: {
    timeout: {
      control: { type: 'range', min: 500, max: 1500, step: 100 }
    }
  }
}

function generateToast(onlyErrors, onlyUndoable) {
  const stamp = Date.now()
  const type = ''
  const isError = onlyErrors || Math.random() > 0.5
  const showUndo = onlyUndoable || Math.random() > 0.5
  const messages = [
    'Homemade Strawberry Jam.',
    'Small Batch Loquat Jam.',
    'Rosewater Raspberry Jam.',
    'Wild Plum Jam.',
    'Rhubarb Jam with Orange and Ginger.',
    'Hot Pepper Jam.',
    'Carrot Jam.',
    'Pomegranate Cranberry Jam.'
  ]
  const message = messages[Math.floor(Math.random() * messages.length)]

  return {
    stamp,
    type,
    message,
    isError,
    showUndo
  }
}

export const ToastList = (args) => {
  const [toasts, setToasts] = useState([])
  const addToast = () => {
    setToasts((toasts) => [...toasts, generateToast(args.onlyErrors, args.onlyUndoable)])
  }

  useEffect(() => {
    const interval = setInterval(addToast, args.timeout)
    return () => clearInterval(interval)
  }, [args.timeout, toasts])

  const remove = (stamp) => {
    setToasts((toasts) => toasts.filter((item) => item.stamp !== stamp))
  }

  return (
    <div className={toastStyle}>
      {toasts.map((toast) => (
        <Toast {...toast} key={toast.stamp} remove={() => remove(toast.stamp)} />
      ))}
    </div>
  )
}

ToastList.args = {
  timeout: 1000,
  onlyErrors: false,
  onlyUndoable: false
}
