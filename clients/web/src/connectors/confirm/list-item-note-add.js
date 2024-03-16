import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { AddNoteModal } from 'components/shareable-lists/add-note-modal'
import { mutateListItemNoteCancel } from 'connectors/lists/mutation-update.state'
import { mutateListItemNoteConfirm } from 'connectors/lists/mutation-update.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const AddListItemNote = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const id = useSelector((state) => state.mutationListUpdate.listItemId)
  const position = useSelector((state) => state.mutationListUpdate.listItemPosition)
  const item = useSelector((state) => state.listsDisplay[id])
  const showModal = useSelector((state) => state.mutationListUpdate.listItemNoteOpen)

  if (!item) return null
  const { note, analyticsData: passedAnalytics } = item
  const analyticsData = {
    ...passedAnalytics,
    sortOrder: position,
    note
  }

  const handleClose = () => {
    dispatch(mutateListItemNoteCancel())
    dispatch(sendSnowplowEvent('shareable-list.item.note.add.cancel', analyticsData))
  }

  const handleSubmit = (note) => {
    dispatch(mutateListItemNoteConfirm(note))
    dispatch(sendSnowplowEvent('shareable-list.item.note.add.submit', { ...analyticsData, note }))
  }

  return showModal ? (
    <AddNoteModal
      showModal={showModal}
      label={t('list:add-note', 'Add Note')}
      note={note}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  ) : null
}
