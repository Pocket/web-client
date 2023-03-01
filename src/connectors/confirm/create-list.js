import { useSelector, useDispatch } from 'react-redux'
import { CreateEditShareableList } from 'components/shareable-lists/create-edit-modal'
import { mutateListConfirm } from 'connectors/lists/mutation-create.state'
import { mutateListCancel } from 'connectors/lists/mutation-create.state'

export const CreateListModal = () => {
  const dispatch = useDispatch()

  const showModal = useSelector((state) => state.mutationListCreate)

  const handleClose = () => {
    dispatch(mutateListCancel())
    // send snowplow event here
  }

  const handleSubmit = (title, description) => {
    dispatch(mutateListConfirm({ title, description }))
    // send snowplow event here
  }

  const createList = 'Create List'

  return (
    <CreateEditShareableList
      showModal={showModal}
      modalTitle={createList}
      modalSubmit={createList}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  )
}
