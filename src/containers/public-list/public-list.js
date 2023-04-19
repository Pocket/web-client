import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import Layout from 'layouts/main'
import { ListPublicHeader } from 'components/headers/lists-header'
import { PublicListCard } from 'connectors/lists/public-list.card'
import { BASE_URL } from 'common/constants'
import ErrorPage from 'containers/_error/error'
import { mutationUpsertTransitionalItem } from 'connectors/items/mutation-upsert.state'
import { mutationDeleteTransitionalItem } from 'connectors/items/mutation-delete.state'
import { ReportIcon } from 'components/icons/ReportIcon'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

function buildReportEmail(url) {
  const subject = `Report List: ${url}`
  const body = 'Please state your reason for reporting this list:'

  return `mailto:reportlist@getpocket.com?subject=${subject}&body=${body}`
}

export const PublicList = ({ listId, slug, statusCode }) => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user?.auth)
  const list = useSelector((state) => state.listsDisplay[listId])
  const saveItemId = useSelector((state) => state.itemsTransitions[slug])

  if (statusCode) return <ErrorPage statusCode={statusCode} />
  if (!list) return null

  const { title, description, listItemIds, user, imageUrl, analyticsData } = list
  const listCount = listItemIds?.length
  const saveStatus = saveItemId ? 'saved' : 'unsaved'
  const url = `${BASE_URL}/sharedlists/${listId}/${slug}`
  const metaData = { title, description, url, image: imageUrl }

  const onSave = () => {
    dispatch(sendSnowplowEvent('public-list.save', analyticsData))
    dispatch(mutationUpsertTransitionalItem(url, slug))
  }

  const onUnSave = () => {
    dispatch(sendSnowplowEvent('public-list.unsave', analyticsData))
    dispatch(mutationDeleteTransitionalItem(saveItemId, slug))
  }

  const emailUrl = buildReportEmail(url)
  const onReport = () => {
    dispatch(sendSnowplowEvent('public-list.report', analyticsData))
    window.location.href = emailUrl
  }

  const saveAction = saveItemId ? onUnSave : onSave

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Layout title={title} metaData={metaData}>
        <ListPublicHeader
          title={title}
          description={description}
          avatarUrl={user?.avatarUrl}
          userName={user?.username}
          listCount={listCount}
          isAuthenticated={isAuthenticated}
          saveStatus={saveStatus}
          handleSaveAll={saveAction}
        />

        {listCount
          ? listItemIds.map((externalId, index) => (
              <PublicListCard
                key={externalId}
                listId={listId}
                externalId={externalId}
                position={index}
              />
            ))
          : null}
        <button className="tiny outline" data-cy="report-list" onClick={onReport}>
          <ReportIcon /> Report List
        </button>
      </Layout>
    </>
  )
}
