import { CreateEditShareableList } from 'components/shared-lists/create-edit-modal'

export const ListSettingsModal = () => {
  const listName = 'Temp list name' // temporary
  const listDescription = 'Temp description' // temporary

  const handleClose = () => {}
  const handleSubmit = () => {}
  const handleNameChange = () => {}
  const handleDescriptionChange = () => {}

  return (
    <CreateEditShareableList
      modalTitle="List Settings"
      modalSubmit="Save Changes"
      listName={listName}
      listDescription={listDescription}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      handleNameChange={handleNameChange}
      handleDescriptionChange={handleDescriptionChange}
    />
  )
}
