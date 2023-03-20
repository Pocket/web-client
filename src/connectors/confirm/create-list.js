import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CreateEditShareableList } from 'components/shareable-lists/create-edit-modal'
import { mutateListConfirm } from 'connectors/lists/mutation-create.state'
import { mutateListCancel } from 'connectors/lists/mutation-create.state'

export const CreateListModal = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)

  const showModal = useSelector((state) => state.mutationListCreate.open)
  const id = useSelector((state) => state.mutationListCreate.id)
  const titleToIdList = useSelector((state) => state.pageListsInfo.titleToIdList)

  const titleList = titleToIdList ? Object.keys(titleToIdList) : []

  const handleClose = () => {
    dispatch(mutateListCancel())
    // send snowplow event here
    setError(null)
  }

  const handleSubmit = (title, description) => {
    if (titleList.includes(title)) return setError('List name has already been used.')

    dispatch(mutateListConfirm({ title, description }))
    // send snowplow event here
    setError(null)
  }

  const createList = (id) ? 'Create list with item' : 'Create list'

  return showModal ? (
    <CreateEditShareableList
      showModal={showModal}
      modalTitle={createList}
      modalSubmit={'Create List'}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      error={error}
    />
  ) : null
}
