import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AddToListModal } from 'components/shareable-lists/add-to-list-modal'
import { mutateListAddCancel } from 'connectors/lists/mutation-add.state'
import { mutateListAddConfirm } from 'connectors/lists/mutation-add.state'
import { getUserShareableLists } from 'containers/lists/lists.state'

export const ConfirmAddToList = () => {
  const dispatch = useDispatch()

  const showModal = useSelector((state) => state.mutationListAdd.open)
  const lastUsedList = useSelector((state) => state.mutationListAdd.lastUsedList)
  const titleToIdList = useSelector((state) => state.pageListsInfo.titleToIdList)

  useEffect(() => {
    if (showModal) dispatch(getUserShareableLists())
  }, [dispatch, showModal])

  const handleCreate = () => {
    // create list
  }

  const handleClose = () => {
    dispatch(mutateListAddCancel())
    // send snowplow event here
  }

  const handleSubmit = (listTitle) => {
    const externalId = titleToIdList[listTitle]
    dispatch(mutateListAddConfirm({ externalId, listTitle }))
    // send snowplow event here
  }

  const addToList = 'Add to List'
  const selectOptions = titleToIdList ? Object.keys(titleToIdList) : []

  return (
    <AddToListModal
      showModal={showModal}
      modalTitle={addToList}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      previouslySelected={lastUsedList}
      selectOptions={selectOptions}
    />
  )
}
