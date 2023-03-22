import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AddToListModal } from 'components/shareable-lists/add-to-list-modal'
import { mutateListCreate } from 'connectors/lists/mutation-create.state'
import { mutateListAddCancel } from 'connectors/lists/mutation-add.state'
import { mutateListAddConfirm } from 'connectors/lists/mutation-add.state'
import { getUserShareableLists } from 'containers/lists/lists.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const ConfirmAddToList = () => {
  const dispatch = useDispatch()

  const id = useSelector((state) => state.mutationListAdd.id)
  const showModal = useSelector((state) => state.mutationListAdd.open)
  const lastUsedList = useSelector((state) => state.mutationListAdd.lastUsedList)
  const titleToIdList = useSelector((state) => state.pageListsInfo.titleToIdList)
  const item = useSelector((state) => state.itemsDisplay[id])

  useEffect(() => {
    if (showModal) dispatch(getUserShareableLists())
  }, [dispatch, showModal])

  const handleCreate = () => {
    dispatch(mutateListCreate(id))
    // send snowplow event here
  }

  const handleClose = () => {
    dispatch(sendSnowplowEvent('shareable-list.item.add.cancel'))
    dispatch(mutateListAddCancel())
  }

  const handleSubmit = (listTitle) => {
    const externalId = titleToIdList[listTitle]
    dispatch(
      sendSnowplowEvent('shareable-list.item.add.confirm', {
        ...item?.analyticsData,
        label: listTitle
      })
    )
    dispatch(mutateListAddConfirm({ externalId, listTitle }))
  }

  const addToList = 'Add to List'
  const selectOptions = titleToIdList ? Object.keys(titleToIdList) : []

  return showModal ? (
    <AddToListModal
      showModal={showModal}
      modalTitle={addToList}
      handleCreate={handleCreate}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      previouslySelected={lastUsedList}
      selectOptions={selectOptions}
    />
  ) : null
}
