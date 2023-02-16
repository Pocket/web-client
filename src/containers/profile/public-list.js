import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Layout from 'layouts/main'
import { ListPublicHeader } from 'components/headers/lists-header'

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

const MOCK_USER = {
  avatarUrl: 'https://picsum.photos/200',
  userName: 'Luigi Mario'
}

export const PublicList = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { slug, profile } = router.query
  const userId = profile.replace('@', '')
  console.log({ slug, userId })

  const isAuthenticated = useSelector((state) => state.user?.auth)
  const saveStatus = 'unsaved'

  const { title, description, listItems } = MOCK_DATA
  const { avatarUrl, userName } = MOCK_USER

  const handleSaveAll = () => {}

  return (
    <>
      <Head>
        <title>Pocket - {title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Layout>
        <ListPublicHeader
          title={title}
          description={description}
          avatarUrl={avatarUrl}
          userName={userName}
          listCount={listItems.length}
          isAuthenticated={isAuthenticated}
          saveStatus={saveStatus}
          handleSaveAll={handleSaveAll}
        />
      </Layout>
    </>
  )
}
