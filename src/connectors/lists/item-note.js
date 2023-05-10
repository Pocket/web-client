import { css, cx } from 'linaria'
import { useTranslation } from 'next-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { EditIcon } from 'components/icons/EditIcon'
import { DeleteIcon } from 'components/icons/DeleteIcon'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { mutateListItemNoteDelete } from './mutation-delete.state'
import { mutateListItemNoteEdit } from './mutation-update.state'
import { topTooltip } from 'components/tooltip/tooltip'
import { breakpointSmallTablet } from 'common/constants'

const itemNoteStyles = css`
  display: flex;
  flex-direction: column;
  grid-column: span 12;
  padding: 16px 16px 14px 16px;
  background: #f9fafb;
  border-top: 1px solid #d9d9d9;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  .note {
    margin-right: 39px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: var(--color-textPrimary);
    ${breakpointSmallTablet} {
      margin-right: 0px;
    }
  }
  footer {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .creator {
    }
  }
  .edit-delete {
    margin-left: auto;
    display: flex;
  }
`

export const ItemNote = ({ externalId, position }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const item = useSelector((state) => state.listsDisplay[externalId])

  if (!item) return null
  const { note, analyticsData: passedAnalytics } = item
  const analyticsData = {
    ...passedAnalytics,
    sortOrder: position,
    position,
    note
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
    <div className={itemNoteStyles}>
      <span className="note">{note}</span>
      <footer>
        <span className="creator" />
        <div className="edit-delete">
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
      </footer>
    </div>
  ) : null
}
