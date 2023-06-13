import { Toast as Component } from './toast'
import { actionToastsReducers, sendToast } from 'connectors/toasts/toast.state'
import { TOAST_TEST_MESSAGE } from 'actions'
import { actions } from 'connectors/dev-tools/toasts'
import { mutationTypes } from 'connectors/dev-tools/toasts'

export default {
  title: 'Toast/Toast',
  component: Component,
  argTypes: {
    type: { control: { type: 'select' }, options: actions },
    count: { control: { type: 'select' }, options: [1, 2, 5, 10, 100] }
  }
}

export const Toast = (args) => {
  // if a mutation, we need to include the action as the actionType
  // otherwise a reducer somewhere is going to throw an error
  const type = mutationTypes.includes(args.type) ? TOAST_TEST_MESSAGE : args.type

  // ids and deletedItemPosition value are for MUTATION_DELETE_SUCCESS
  // with a count of 5, ids will be [0, 1, 2, 3, 4]
  const data = {
    type,
    actionType: args.type,
    count: args.count,
    ids: [0],
    deletedItemPosition: 1
  }

  const toast = args.type ? actionToastsReducers([], sendToast(data))[0] : undefined

  return (
    <Component
      {...toast}
      count={toast.itemCount}
      show={true}
      remove={() => {}}
      showUndo={() => {}}
      handleUndo={() => {}}
    />
  )
}

Toast.args = {
  count: 1,
  type: ITEMS_ADD_SUCCESS
}
