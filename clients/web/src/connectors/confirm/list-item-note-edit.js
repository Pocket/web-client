import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { AddNoteModal } from 'components/shareable-lists/add-note-modal'
import { mutateListItemNoteCancel } from 'connectors/lists/mutation-update.state'
import { mutateListItemNoteConfirm } from 'connectors/lists/mutation-update.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const EditListItemNote = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const id = useSelector((state) => state.mutationListUpdate.listItemId)
  const position = useSelector((state) => state.mutationListUpdate.listItemPosition)
  const item = useSelector((state) => state.listsDisplay[id])
  const showModal = useSelector((state) => state.mutationListUpdate.listItemNoteEditOpen)

  if (!item) return null
  const { note, analyticsData: passedAnalytics } = item
  const analyticsData = {
    ...passedAnalytics,
    sortOrder: position,
    note
  }

  const handleClose = () => {
    dispatch(mutateListItemNoteCancel())
    dispatch(sendSnowplowEvent('shareable-list.item.note.edit.cancel', analyticsData))
  }

  const handleSubmit = (note) => {
    dispatch(mutateListItemNoteConfirm(note))
    dispatch(sendSnowplowEvent('shareable-list.item.note.edit.confirm', { ...analyticsData, note }))
  }

  return showModal ? (
    <AddNoteModal
      showModal={showModal}
      label={t('list:edit-note', 'Edit Note')}
      note={note}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  ) : null
}
