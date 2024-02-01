import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AddToListModal } from 'components/shareable-lists/add-to-list-modal'
import { mutateListCreate } from 'connectors/lists/mutation-create.state'
import { mutateBulkListCreate } from 'connectors/lists/mutation-create.state'
import { mutateListAddCancel } from 'connectors/lists/mutation-add.state'
import { mutateListAddConfirm } from 'connectors/lists/mutation-add.state'
import { getRecentListsAction } from 'containers/lists/lists.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { useTranslation } from 'next-i18next'

export const ConfirmAddToList = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const id = useSelector((state) => state.mutationListAdd.id)
  const ids = useSelector((state) => state.mutationListAdd.ids)
  const showModal = useSelector((state) => state.mutationListAdd.open)
  const lastUsedList = useSelector((state) => state.mutationListAdd.lastUsedList)
  const titleToIdList = useSelector((state) => state.pageListsInfo.titleToIdList)
  const itemsDisplay = useSelector((state) => state.itemsDisplay)
  const item = itemsDisplay[id]

  useEffect(() => {
    if (showModal) dispatch(getRecentListsAction())
  }, [dispatch, showModal])

  const handleCreate = () => {
    if (id) dispatch(mutateListCreate(id))
    if (ids) dispatch(mutateBulkListCreate(ids))
    dispatch(sendSnowplowEvent('shareable-list.item.add.create-list'))
  }

  const handleClose = () => {
    dispatch(sendSnowplowEvent('shareable-list.item.add.cancel'))
    dispatch(mutateListAddCancel())
  }

  const handleSubmit = (listTitle) => {
    const externalId = titleToIdList[listTitle]
    // TODO: Analytics!!!
    dispatch(
      sendSnowplowEvent('shareable-list.item.add.confirm', {
        ...item?.analyticsData,
        listItemNoteVisibility: item?.listItemNoteVisibility,
        label: listTitle
      })
    )
    dispatch(mutateListAddConfirm({ externalId, listTitle }))
  }

  const addToList = t('list:add-to-list', 'Add to List')
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
