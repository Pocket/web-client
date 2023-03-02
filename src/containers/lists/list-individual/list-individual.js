import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { ListIndividualHeader } from 'components/headers/lists-header'
import { EmptyIndividualLists } from 'components/empty-states/inividual-list'
import { getIndividualListAction } from './list-individual.state'
import { IndividualListCard } from 'connectors/lists/individual-list.card'

const MOCK_DATA = {
  userId: 'luigimario',
  slug: 'the-cosmos-awaits-123456'
}

export const ListIndividual = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { slug: id } = router.query

  const list = useSelector((state) => state.itemsDisplay[id])
  const listItemIds = useSelector((state) => state.pageIndividualListIds?.[id])

  const userStatus = useSelector((state) => state.user.user_status)
  const shouldRender = userStatus !== 'pending'

  useEffect(() => {
    dispatch(getIndividualListAction(id))
  }, [dispatch, id])

  if (!list) return null
  const { title, description, status } = list
  const showLists = listItemIds?.length

  // Actions
  const handlePublish = () => {}
  const handleShare = () => {}
  const handleEdit = () => {}

  return (
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
  )
}
