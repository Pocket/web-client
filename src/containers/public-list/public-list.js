import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import Layout from 'layouts/main'
import { ListPublicHeader } from 'components/headers/lists-header'
import { PublicListCard } from 'connectors/lists/public-list.card'
import { BASE_URL } from 'common/constants'
import ErrorPage from 'containers/_error/error.js'
import { mutationUpsertTransitionalItem } from 'connectors/items/mutation-upsert.state'
import { mutationDeleteTransitionalItem } from 'connectors/items/mutation-delete.state'

export const PublicList = ({ listId, slug, statusCode }) => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user?.auth)
  const list = useSelector((state) => state.pagePublicList)
  const saveItemId = useSelector((state) => state.itemsTransitions[slug])

  if (statusCode) return <ErrorPage statusCode={statusCode} />
  if (!list) return null

  const { title, description, listItems, user } = list
  const showLists = listItems?.length
  const saveStatus = saveItemId ? 'saved' : 'unsaved'
  const url = `${BASE_URL}/sharedlists/${listId}/${slug}`
  const image = listItems?.[0]?.imageUrl
  const metaData = { title, description, url, image }

  const onSave = () => {
    // snowplow event here
    dispatch(mutationUpsertTransitionalItem(url, slug))
  }

  const onUnSave = () => {
    // snowplow event here
    dispatch(mutationDeleteTransitionalItem(saveItemId, slug))
  }

  const saveAction = saveItemId ? onUnSave : onSave

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Layout
        title={title}
        metaData={metaData}
      >
        <ListPublicHeader
          title={title}
          description={description}
          avatarUrl={user?.avatarUrl}
          userName={user?.userName}
          listCount={listItems?.length}
          isAuthenticated={isAuthenticated}
          saveStatus={saveStatus}
          handleSaveAll={saveAction}
        />

        {showLists
          ? listItems.map((item) => (
            <PublicListCard
              key={item.externalId}
              listId={listId}
              {...item}
            />
          )) : null}
      </Layout>
    </>
  )
}
