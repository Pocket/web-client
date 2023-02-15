import { useSelector, useDispatch } from 'react-redux'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { ListIndividualHeader } from 'components/headers/lists-header'
import { EmptyIndividualLists } from 'components/empty-states/inividual-list'

const MOCK_DATA = {
  id: '1111111',
  externalId: '261f4a81-878a-4d5b-bad8-239e3f9eef29',
  userId: 'luigimario',
  slug: 'the-cosmos-awaits-123456',
  title: 'The Cosmos Awaits',
  description: 'Ship of the imagination Drake Equation intelligent beings the carbon in our apple pies stirred by starlight network of wormholes. Cosmic ocean preserve and cherish that pale blue dot the sky calls to us a mote of dust suspended in a sunbeam realm of the galaxies globular star cluster.', //prettier-ignore
  status: 'PRIVATE',
  moderationStatus: 'VISIBLE',
  moderatedBy: null,
  moderationReason: null,
  createdAt: Date.now(),
  updatedAt: null,
  listItems: []
}

export const ListIndividual = () => {
  const dispatch = useDispatch()

  const userStatus = useSelector((state) => state.user.user_status)

  const shouldRender = userStatus !== 'pending'

  // Actions
  const handlePublish = () => { }
  const handleShare = () => { }
  const handleEdit = () => { }

  return (
    <Layout>
      <SideNav type="saves" />

      {shouldRender ? (
        <main className="main">
          <ListIndividualHeader
            title={MOCK_DATA.title}
            description={MOCK_DATA.description}
            status={MOCK_DATA.status}
            userId={MOCK_DATA.userId}
            slug={MOCK_DATA.slug}
            handlePublish={handlePublish}
            handleShare={handleShare}
            handleEdit={handleEdit}
          />

          {/* List Component */}
          <EmptyIndividualLists />
        </main>
      ) : null}
    </Layout>
  )
}
