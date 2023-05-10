import { css, cx } from 'linaria'
import { useTranslation } from 'next-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { EditIcon } from 'components/icons/EditIcon'
import { DeleteIcon } from 'components/icons/DeleteIcon'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { mutateListItemNoteDelete } from './mutation-delete.state'
import { mutateListItemNoteEdit } from './mutation-update.state'
import { topTooltip } from 'components/tooltip/tooltip'

export const ItemNote = ({ externalId, position }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const item = useSelector((state) => state.listsDisplay[externalId])

  if (!item) return null
  const { note, analyticsData: passedAnalytics } = item
  const analyticsData = {
    ...passedAnalytics,
    sortOrder: position,
    position
  }

  const handleEdit = () => {
    dispatch(mutateListItemNoteEdit({ id: externalId, position }))
    dispatch(sendSnowplowEvent('shareable-list.item.note.edit.intent', analyticsData))
  }

  const handleDelete = () => {
    dispatch(mutateListItemNoteDelete(externalId))
    dispatch(sendSnowplowEvent('shareable-list.item.note.delete.intent', analyticsData))
  }

  return note ? (
    <div>
      {note}

      <div>
        <button
          className={cx(topTooltip, 'inline')}
          aria-label={t('list:edit-note', 'Edit Note')}
          data-tooltip={t('list:edit-note', 'Edit Note')}
          onClick={handleEdit}>
          <EditIcon />
        </button>

        <button
          className={cx(topTooltip, 'inline')}
          aria-label={t('list:delete-note', 'Delete Note')}
          data-tooltip={t('list:delete-note', 'Delete Note')}
          onClick={handleDelete}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  ) : null
}
