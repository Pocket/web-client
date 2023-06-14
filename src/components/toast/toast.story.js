import { Toast as Component } from './toast'
import { toastStyle } from 'connectors/toasts/toast-list'

export default {
  title: 'Components/Toast',
  component: Component
}

export const Toast = (args) => {
  return (
    <div className={toastStyle}>
      <Component
        show={true}
        undoString="Undo"
        remove={() => {}}
        handleUndo={() => {}}
        type=""
        {...args}
      />
    </div>
  )
}

Toast.args = {
  isError: false,
  message: 'you are perfect',
  showUndo: false
}
