import { Toast as Component } from './toast'
import { actionToastsReducers, sendToast } from 'connectors/toasts/toast.state'
import { ITEMS_ADD_SUCCESS } from 'actions'
import { actions, createToastData } from 'connectors/dev-tools/toasts'

export default {
  title: 'Toast/Toast',
  component: Component,
  argTypes: {
    count: { control: { type: 'number', min: 1 } },
    showUndo: { control: { type: 'boolean' } },
    type: { control: { type: 'select' }, options: actions }
  }
}

export const Toast = (args) => {
  const data = createToastData(args.type, args.count)
  const toast = args.type ? actionToastsReducers([], sendToast(data))[0] : undefined

  return (
    <Component
      {...toast}
      count={toast.itemCount}
      show={true}
      remove={() => {}}
      showUndo={args.showUndo}
      handleUndo={() => {}}
    />
  )
}

Toast.args = {
  count: 1,
  showUndo: false,
  type: ITEMS_ADD_SUCCESS
}
