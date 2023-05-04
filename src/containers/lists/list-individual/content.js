import { useSelector, useDispatch } from 'react-redux'
import { ListIndividualHeader } from 'components/headers/lists-header'
import { EmptyIndividualLists } from 'components/empty-states/individual-list'
import { IndividualListCard } from 'connectors/lists/individual-list.card'
import { shareListAction } from 'connectors/lists/mutation-share.state'
import { mutateListUpdateAction } from 'connectors/lists/mutation-update.state'
import { mutateListStatusAction } from 'connectors/lists/mutation-update.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export const ListContent = ({ id, toggleSort }) => {
  const dispatch = useDispatch()

  const list = useSelector((state) => state.listsDisplay[id])
  const featureState = useSelector((state) => state.features)
  const inListsDev = featureFlagActive({ flag: 'lists.dev', featureState })

  const userStatus = useSelector((state) => state.user.user_status)
  const shouldRender = userStatus !== 'pending'

  if (!list) return null
  const {
    title,
    description,
    slug,
    status,
    listItemIds,
    listItemNoteVisibility,
    analyticsData: passedAnalytics
  } = list
  const showPlaceholder = listItemIds?.length === 0

  const analyticsData = {
    ...passedAnalytics,
    title,
    description,
    status,
    slug,
    listItemNoteVisibility
  }

  // Actions
  const handleSetStatus = ({ status, listItemNoteVisibility }) => {
    dispatch(sendSnowplowEvent('shareable-list.status.update', { ...analyticsData, status }))
    dispatch(mutateListStatusAction({ id, status, listItemNoteVisibility }))
  }
  const handleShare = () => {
    dispatch(sendSnowplowEvent('shareable-list.share', analyticsData))
    dispatch(shareListAction(id))
  }
  const handleEdit = () => {
    dispatch(sendSnowplowEvent('shareable-list.edit-settings.intent', analyticsData))
    dispatch(mutateListUpdateAction(id))
  }
  const handleSort = () => {
    // dispatch(sendSnowplowEvent('shareable-list.sort.intent', analyticsData))
    toggleSort(true)
  }
  const handleSavesClick = () => {
    dispatch(sendSnowplowEvent('shareable-list.empty-list.go-to-saves', analyticsData))
  }
  const handleCopyUrl = () => {
    dispatch(sendSnowplowEvent('shareable-list.public-link.copy.header', analyticsData))
  }
  const handleOpenUrl = () => {
    dispatch(sendSnowplowEvent('shareable-list.public-link.open.header', analyticsData))
  }

  return shouldRender ? (
    <main className="main">
      <ListIndividualHeader
        inListsDev={inListsDev}
        title={title}
        description={description}
        status={status}
        externalId={id}
        slug={slug}
        listItemNoteVisibility={listItemNoteVisibility}
        handleSetStatus={handleSetStatus}
        handleShare={handleShare}
        handleEdit={handleEdit}
        handleSort={handleSort}
        handleCopyUrl={handleCopyUrl}
        handleOpenUrl={handleOpenUrl}
      />

      {showPlaceholder ? <EmptyIndividualLists handleClick={handleSavesClick} /> : null}
      {listItemIds ? listItemIds.map((externalId, index) => (
        <IndividualListCard
          key={externalId}
          id={externalId}
          listId={id}
          position={index}
        />
      )) : null}
    </main>
  ) : null
}
