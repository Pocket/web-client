import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'containers/_error/error.js'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { ListIndividualHeader } from 'components/headers/lists-header'
import { EmptyIndividualLists } from 'components/empty-states/inividual-list'
import { getIndividualListAction } from './list-individual.state'
import { IndividualListCard } from 'connectors/lists/individual-list.card'
import { ListSettingsModal } from 'connectors/confirm/list-settings'
import { CreateListModal } from 'connectors/confirm/create-list'
import { ConfirmShare } from 'connectors/confirm/share-list'
import { shareListAction } from 'connectors/lists/mutation-share.state'
import { mutateListUpdateAction } from 'connectors/lists/mutation-update.state'
import { mutateListStatusAction } from 'connectors/lists/mutation-update.state'
import { Toasts } from 'connectors/toasts/toast-list'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const ListIndividual = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { slug: id } = router.query

  const enrolled = useSelector((state) => state.pageListsInfo.enrolled)
  const enrolledFetched = useSelector((state) => state.pageListsInfo.enrolledFetched)
  const list = useSelector((state) => state.listsDisplay[id])
  const listItemIds = useSelector((state) => state.pageIndividualListIds?.[id])

  const userStatus = useSelector((state) => state.user.user_status)
  const shouldRender = userStatus !== 'pending'

  useEffect(() => {
    if (enrolled) dispatch(getIndividualListAction(id))
  }, [dispatch, id, enrolled])

  if (!list) return null
  const { title, description, slug, status, moderationStatus, createdAt, updatedAt } = list
  const showLists = listItemIds?.length

  const analyticsData = {
    shareableListExternalId: id,
    slug,
    title,
    description,
    status,
    moderationStatus,
    createdAt: Date.parse(createdAt) / 1000,
    updatedAt: Date.parse(updatedAt) / 1000
  }

  // Actions
  const handleSetStatus = (val) => dispatch(mutateListStatusAction({ id, status: val }))
  const handleShare = () => {
    dispatch(sendSnowplowEvent('shareable-list.share', analyticsData))
    dispatch(shareListAction(id))
  }
  const handleEdit = () => dispatch(mutateListUpdateAction(id))

  if (!enrolledFetched) return null
  if (enrolledFetched && !enrolled) return <ErrorPage statusCode={404} />
  return (
    <>
      <Layout>
        <SideNav type="saves" />

        {shouldRender ? (
          <main className="main">
            <ListIndividualHeader
              title={title}
              description={description}
              status={status}
              externalId={id}
              slug={slug}
              handleSetStatus={handleSetStatus}
              handleShare={handleShare}
              handleEdit={handleEdit}
            />

            {showLists
              ? listItemIds.map((externalId) => <IndividualListCard key={externalId} id={externalId} listId={id} />)
              : <EmptyIndividualLists />}
          </main>
        ) : null}
      </Layout>

      <ListSettingsModal id={id} />
      <CreateListModal />
      <ConfirmShare />
      <Toasts />
    </>
  )
}
