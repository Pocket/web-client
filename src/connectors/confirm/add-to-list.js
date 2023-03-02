import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AddToListModal } from 'components/shareable-lists/add-to-list-modal'
import { mutateListAddCancel } from 'connectors/lists/mutation-add.state'
import { mutateListAddConfirm } from 'connectors/lists/mutation-add.state'
import { getUserShareableLists } from 'containers/lists/lists.state'

export const ConfirmAddToList = () => {
  const dispatch = useDispatch()

  const showModal = useSelector((state) => state.mutationListAdd)

  useEffect(() => {
    dispatch(getUserShareableLists())
  }, [dispatch])

  const handleClose = () => {
    dispatch(mutateListAddCancel())
    // send snowplow event here
  }

  const handleSubmit = (title, description) => {
    dispatch(mutateListAddConfirm({ title, description }))
    // send snowplow event here
  }

  const addToList = 'Add to List'

  return (
    <AddToListModal
      showModal={showModal}
      modalTitle={addToList}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  )
}
