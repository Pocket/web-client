import { cx, css } from 'linaria'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { mutateListItemNote } from './mutation-update.state'
import { mutateListItemDelete, mutateListItemNoteDelete } from './mutation-delete.state'
import { EditIcon } from 'components/icons/EditIcon'
import { DeleteIcon } from 'components/icons/DeleteIcon'
import { Item } from 'components/item/item'
import { stackedGrid, stackedGridNoAside } from 'components/item/items-layout'
import { setNoImage } from 'connectors/lists/lists-display.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { AddNoteIcon } from 'components/icons/AddNoteIcon'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import { topTooltip } from 'components/tooltip/tooltip'

export const IndividualListCard = ({ id, listId, position }) => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.listsDisplay[id])
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))

  if (!item) return null
  const { externalId, title, excerpt, publisher, url, note, analyticsData: passedAnalytics } = item
  const analyticsData = {
    ...passedAnalytics,
    sortOrder: position,
    position,
    destination: 'external',
    note
  }

  const itemImage = item?.noImage ? '' : item?.imageUrl
  const onImageFail = () => dispatch(setNoImage(id))

  const onItemInView = (inView) => {
    if (!impressionFired && inView) {
      dispatch(sendSnowplowEvent('shareable-list.item.impression', analyticsData))
    }
  }

  const onOpen = () => {
    dispatch(sendSnowplowEvent('shareable-list.item.open', analyticsData))
  }

  const onOpenOriginal = () => {
    dispatch(sendSnowplowEvent('shareable-list.item.open-original', analyticsData))
  }

  return (
    <div className={cx(stackedGrid, stackedGridNoAside)}>
      <Item
        listId={listId}
        itemId={externalId}
        title={title}
        excerpt={excerpt}
        itemImage={itemImage}
        note={note}
        publisher={publisher}
        openUrl={url}
        externalUrl={url}
        onImageFail={onImageFail}
        onItemInView={onItemInView}
        onOpenOriginalUrl={onOpenOriginal}
        onOpen={onOpen}
        analyticsData={analyticsData}
        position={position}
        Actions={ListActions}
        NoteActions={NoteActions}
        clamp
      />
    </div>
  )
}

const listActionStyles = css`
  button {
    margin-left: 8px;
    height: 30px;
  }

  .icon {
    margin-right: 8px;
  }
`

export const ListActions = ({ id, listId, analyticsData, position }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const note = useSelector((state) => state.listsDisplay[id]?.note)
  const featureState = useSelector((state) => state.features)
  const inListsDev = featureFlagActive({ flag: 'lists.dev', featureState })

  const handleAddNote = () => {
    dispatch(sendSnowplowEvent('shareable-list.item.note.add.intent', analyticsData))
    dispatch(mutateListItemNote({ id, position }))
  }

  const handleDeleteItem = () => {
    dispatch(sendSnowplowEvent('shareable-list.item.remove', analyticsData))
    dispatch(mutateListItemDelete({ id, listId }))
  }

  return (
    <div className={listActionStyles}>
      {inListsDev && !note ? (
        <button
          aria-label={t('list:add-note', 'Add Note')}
          data-cy="add-note"
          className="tiny outline"
          onClick={handleAddNote}>
          <AddNoteIcon />
          {t('list:add-note', 'Add Note')}
        </button>
      ) : null}
      <button
        aria-label={t('list:remove-item-from-list', 'Remove item from list')}
        data-cy="remove-item"
        className="tiny outline"
        onClick={handleDeleteItem}>
        {t('list:remove', 'Remove')}
      </button>
    </div>
  )
}

export const NoteActions = ({ externalId, analyticsData }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleEdit = () => {
    // dispatch(mutateListItemNote(externalId))
    // dispatch(sendSnowplowEvent('shareable-list.item.note.edit.intent', analyticsData))
  }

  const handleDelete = () => {
    dispatch(mutateListItemNoteDelete(externalId))
    dispatch(sendSnowplowEvent('shareable-list.item.note.delete.intent', analyticsData))
  }

  return (
    <>
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
    </>
  )
}
