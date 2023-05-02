import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'containers/_error/error'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { ListIndividualHeader } from 'components/headers/lists-header'
import { EmptyIndividualLists } from 'components/empty-states/individual-list'
import { getIndividualListAction } from 'containers/lists/lists.state'
import { IndividualListCard } from 'connectors/lists/individual-list.card'
import { ListSettingsModal } from 'connectors/confirm/list-settings'
import { CreateListModal } from 'connectors/confirm/create-list'
import { ConfirmShare } from 'connectors/confirm/share-list'
import { shareListAction } from 'connectors/lists/mutation-share.state'
import { mutateListUpdateAction } from 'connectors/lists/mutation-update.state'
import { mutateListStatusAction } from 'connectors/lists/mutation-update.state'
import { Toasts } from 'connectors/toasts/toast-list'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export const ListIndividual = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { slug: id } = router.query

  const enrolled = useSelector((state) => state.pageListsInfo.enrolled)
  const enrolledFetched = useSelector((state) => state.pageListsInfo.enrolledFetched)
  const list = useSelector((state) => state.listsDisplay[id])

  const featureState = useSelector((state) => state.features)
  const inListsDev = featureFlagActive({ flag: 'lists.dev', featureState })

  const userStatus = useSelector((state) => state.user.user_status)
  const shouldRender = userStatus !== 'pending'

  useEffect(() => {
    if (enrolled) dispatch(getIndividualListAction(id))
  }, [dispatch, id, enrolled])

  if (!list) return null
  const {
    title,
    description,
    slug,
    status,
    listItemIds,
    listItemNoteVisibility,
    analyticsData: passedAnalytics,
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
  const handleSetStatus = ({status, listItemNoteVisibility}) => {
    dispatch(sendSnowplowEvent('shareable-list.status.update', { ...analyticsData, status: status }))
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
  const handleSavesClick = () => {
    dispatch(sendSnowplowEvent('shareable-list.empty-list.go-to-saves', analyticsData))
  }
  const handleCopyUrl = () => {
    dispatch(sendSnowplowEvent('shareable-list.public-link.copy.header', analyticsData))
  }
  const handleOpenUrl = () => {
    dispatch(sendSnowplowEvent('shareable-list.public-link.open.header', analyticsData))
  }

  if (!enrolledFetched) return null
  if (enrolledFetched && !enrolled) return <ErrorPage statusCode={404} />
  return (
    <>
      <Layout>
        <SideNav type="saves" tag={id} />

        {shouldRender ? (
          <main className="main">
            <ListIndividualHeader
              title={title}
              description={description}
              status={status}
              externalId={id}
              slug={slug}
              listItemNoteVisibility={listItemNoteVisibility}
              inListsDev={inListsDev}
              handleSetStatus={handleSetStatus}
              handleShare={handleShare}
              handleEdit={handleEdit}
              handleCopyUrl={handleCopyUrl}
              handleOpenUrl={handleOpenUrl}
            />

            {showPlaceholder ? <EmptyIndividualLists handleClick={handleSavesClick} /> : null}

            {listItemIds
              ? listItemIds.map((externalId, index) => (
                <IndividualListCard
                  key={externalId}
                  id={externalId}
                  listId={id}
                  position={index}
                />
              )) : null}
          </main>
        ) : null}
      </Layout>

      <ListSettingsModal id={id} />
      <CreateListModal />
      <ConfirmShare snowplowId="shareable-list" />
      <Toasts />
    </>
  )
}
