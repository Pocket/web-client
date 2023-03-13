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
import { mutateListUpdateAction } from 'connectors/lists/mutation-update.state'
import { Toasts } from 'connectors/toasts/toast-list'

const MOCK_DATA = {
  userId: 'luigimario',
  slug: 'the-cosmos-awaits-123456'
}

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
  const { title, description, status } = list
  const showLists = listItemIds?.length

  // Actions
  const handlePublish = () => {}
  const handleShare = () => {}
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
              userId={MOCK_DATA.userId}
              slug={MOCK_DATA.slug}
              handlePublish={handlePublish}
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
      <Toasts />
    </>
  )
}
