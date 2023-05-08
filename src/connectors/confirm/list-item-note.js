import { useSelector, useDispatch } from 'react-redux'
import { AddNoteModal } from 'components/shareable-lists/add-note-modal'
import { mutateListItemNoteCancel } from 'connectors/lists/mutation-update.state'
import { mutateListItemNoteConfirm } from 'connectors/lists/mutation-update.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const AddListItemNote = () => {
  const dispatch = useDispatch()

  const id = useSelector((state) => state.mutationListUpdate.listItemId)
  const item = useSelector((state) => state.listsDisplay[id])
  const showModal = useSelector((state) => state.mutationListUpdate.listItemNoteOpen)

  if (!item) return null
  const { note, analyticsData } = item

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
      note={note}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  ) : null
}
