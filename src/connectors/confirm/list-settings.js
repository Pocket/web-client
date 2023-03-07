import { useSelector, useDispatch } from 'react-redux'
import { CreateEditShareableList } from 'components/shareable-lists/create-edit-modal'
import { mutateListUpdateCancel } from 'connectors/lists/mutation-update.state'
import { mutateListUpdateConfirm } from 'connectors/lists/mutation-update.state'

export const ListSettingsModal = ({ id }) => {
  const dispatch = useDispatch()

  const list = useSelector((state) => state.listsDisplay[id])
  const showModal = useSelector((state) => state.mutationlistUpdate.open)

  const { title, description } = list

  const handleClose = () => {
    dispatch(mutateListUpdateCancel())
    // snowplow event
  }

  const handleSubmit = (listNameValue, descriptionValue) => {
    const data = {
      title: listNameValue,
      description: descriptionValue
    }
    dispatch(mutateListUpdateConfirm(data))
    // snowplow event
  }

  return (
    <CreateEditShareableList
      showModal={showModal}
      modalTitle="List Settings"
      modalSubmit="Save Changes"
      listName={title}
      listDescription={description}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  )
}
