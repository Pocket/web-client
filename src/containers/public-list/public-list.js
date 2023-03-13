import Head from 'next/head'
import { useSelector } from 'react-redux'
import Layout from 'layouts/main'
import { ListPublicHeader } from 'components/headers/lists-header'
import { PublicListCard } from 'connectors/lists/public-list.card'
import { BASE_URL } from 'common/constants'

export const PublicList = ({ externalId, slug }) => {
  const isAuthenticated = useSelector((state) => state.user?.auth)
  const list = useSelector((state) => state.pagePublicList)

  if (!list) return null

  const { title, description, listItems } = list
  const showLists = listItems?.length
  const saveStatus = 'unsaved'
  const url = `${BASE_URL}/sharedlists/${externalId}/${slug}`
  const image = listItems?.[0]?.imageUrl
  const metaData = { title, description, url, image }

  const handleSaveAll = () => {}

  return (
    <>
      <Head>
        <title>Pocket - {title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Layout
        title={title}
        metaData={metaData}
        forceWebView={true}
      >
        <ListPublicHeader
          title={title}
          description={description}
          // avatarUrl={avatarUrl}
          // userName={userName}
          listCount={listItems?.length}
          isAuthenticated={isAuthenticated}
          saveStatus={saveStatus}
          handleSaveAll={handleSaveAll}
        />

        {showLists
          ? listItems.map((item) => (
            <PublicListCard
              key={item.externalId}
              listId={externalId}
              {...item}
            />
          )) : null}
      </Layout>
    </>
  )
}
