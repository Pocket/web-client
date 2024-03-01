import { cx } from '@emotion/css'
import { useSelector, useDispatch } from 'react-redux'
import { mutateListDelete } from 'connectors/lists/mutation-delete.state'
import { Item } from 'components/item/item'
import { stackedGrid, stackedGridNoAside } from 'components/item/items-layout'
import { DeleteIcon } from 'components/icons/DeleteIcon'
import { setNoImage } from 'connectors/lists/lists-display.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { useTranslation } from 'next-i18next'

export const ListCard = ({ id, position }) => {
  const dispatch = useDispatch()

  const list = useSelector((state) => state.listsDisplay[id])
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))

  if (!list) return null

  const {
    externalId,
    slug,
    title,
    description,
    status,
    totalCount,
    listItemNoteVisibility,
    analyticsData: passedAnalytics
  } = list
  const url = `/sharedlists/${externalId}/${slug}`
  const itemCount = totalCount || '0'
  const itemImage = list?.noImage ? '' : list?.itemImage

  const analyticsData = {
    ...passedAnalytics,
    listItemNoteVisibility,
    position,
    destination: 'internal'
  }

  const onImageFail = () => dispatch(setNoImage(id))

  const onItemInView = (inView) => {
    if (!impressionFired && inView) {
      dispatch(sendSnowplowEvent('shareable-list.impression', analyticsData))
    }
  }

  const onCopyPublicUrl = () => {
    dispatch(sendSnowplowEvent('shareable-list.public-link.copy.all-lists', analyticsData))
  }

  const onOpenPublicUrl = () => {
    dispatch(sendSnowplowEvent('shareable-list.public-link.open.all-lists', analyticsData))
  }

  const onOpenList = () => {
    dispatch(sendSnowplowEvent('shareable-list.open', analyticsData))
  }

  const listStatusInfo = {
    externalId,
    slug,
    status
  }

  return (
    <div className={cx(stackedGrid, stackedGridNoAside)} key={list.externalId}>
      <Item
        itemId={id}
        title={title}
        excerpt={description}
        openUrl={`/lists/${externalId}`}
        onItemInView={onItemInView}
        onCopyPublicUrl={onCopyPublicUrl}
        onOpenPublicUrl={onOpenPublicUrl}
        onOpen={onOpenList}
        isInternalItem={true}
        listStatusInfo={listStatusInfo}
        listUrl={url}
        itemCount={itemCount}
        itemImage={itemImage}
        onImageFail={onImageFail}
        Actions={ListActions}
        analyticsData={analyticsData}
        clamp
      />
    </div>
  )
}

export const ListActions = ({ id, analyticsData }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleDeleteList = () => {
    dispatch(sendSnowplowEvent('shareable-list.delete.intent', analyticsData))
    dispatch(mutateListDelete(id))
  }

  return (
    <button
      aria-label={t('list:delete-list', 'Delete List')}
      data-testid="delete-list"
      className="tiny outline"
      onClick={handleDeleteList}>
      <DeleteIcon /> {t('list:delete', 'Delete')}
    </button>
  )
}
