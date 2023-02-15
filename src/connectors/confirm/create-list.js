import { CreateEditShareableList } from 'components/sharable-lists/create-edit-modal'

export const CreateListModal = () => {
  const createList = 'Create List'

  const handleClose = () => {}
  const handleSubmit = () => {}
  const handleNameChange = () => {}
  const handleDescriptionChange = () => {}

  return (
    <CreateEditShareableList
      modalTitle={createList}
      modalSubmit={createList}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      handleNameChange={handleNameChange}
      handleDescriptionChange={handleDescriptionChange}
    />
  )
}
