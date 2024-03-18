import Layout from 'layouts/main'
import { useSelector, useDispatch } from 'react-redux'

import ErrorPage from 'pages/_error'
import { ConfirmReport } from 'connectors/confirm/report'
import { CallOutBuildHome } from 'components/call-out/call-out-build-home'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { CardPageHeader } from 'components/headers/discover-header'
import { SectionHeader } from 'components/headers/section-header'
import { CollectionPageHeader } from 'components/headers/discover-header'
import { ItemCard } from 'connectors/items/item-card-transitional'
import { heroGrid, stackedGrid } from 'components/item/items-layout'
import { CardTopicsNav } from 'connectors/topic-list/topic-list'
import { useTranslation } from 'next-i18next'
import { BASE_URL } from 'common/constants'

export default function Topic({ locale, statusCode = 500 }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  // Is user logged in?
  const isAuthenticated = useSelector((state) => state.user?.auth)
  const userStatus = useSelector((state) => state.user?.user_status)
  const shouldRender = userStatus !== 'pending'

  // Select state to use
  const topicList = useSelector((state) => state.topicList?.topicsByName)
  const activeTopic = useSelector((state) => state.topicList?.activeTopic)

  const itemIds = useSelector((state) => state.pageTopic?.[activeTopic]) //prettier-ignore

  // Error if no items are available
  if (!itemIds?.length) return <ErrorPage statusCode={statusCode} />

  const topic = topicList[activeTopic] || activeTopic
  const title = topic?.display_name || topic
  const slug = topic?.topic_slug || topic
  const isEditorialCollection = topic?.page_type === 'editorial_collection'

  const languagePrefix = locale === 'en' ? '' : `/${locale}`
  const canonical = `${BASE_URL}${languagePrefix}/explore/${slug}`
  const url = canonical

  const topicMetaData = {
    url,
    description: topic?.social_description,
    image: topic?.social_image,
    title: topic?.social_title
  }

  // Topic actions
  const topicClickRail = (topic) => {
    dispatch(sendSnowplowEvent('topic-page.rail.topic.click', { label: topic }))
  }

  const topicClickBottom = (topic) => {
    dispatch(sendSnowplowEvent('topic-page.bottom.topic.click', { label: topic }))
  }

  return (
    <Layout title={`Pocket: ${title}`} metaData={topicMetaData} canonical={canonical}>
      {!isAuthenticated && shouldRender ? <CallOutBuildHome /> : null}

      {isEditorialCollection ? (
        <CollectionPageHeader title={topic.display_name} note={topic.display_note} />
      ) : (
        <>
          <CardPageHeader title={topic.display_name} />
          <SectionHeader
            sectionTitle={t('discover:curated-by-our-editors', 'Curated by our editors')}
            sectionDescription={t(
              'discover:stories-to-fuel-your-mind',
              'Stories to fuel your mind'
            )}
          />
        </>
      )}

      {/* Curated */}
      <div className={heroGrid}>
        {itemIds.slice(0, 5).map((id, index) => (
          <ItemCard position={index} key={id} id={id} snowplowId="discover" />
        ))}
      </div>

      {isEditorialCollection ? null : (
        <SectionHeader
          sectionTitle={t('discover:popular-with-readers', 'Popular with Pocket readers')}
          sectionDescription={t('discover:stories-from-the-web', 'Stories from across the web')}
          addPadding={true}
        />
      )}

      {/* Algorithmic */}
      <div className={stackedGrid}>
        {itemIds.slice(5, 10).map((id, index) => (
          <ItemCard position={4 + index} key={id} id={id} snowplowId="discover" />
        ))}
        <CardTopicsNav topics={topicList} rail={true} track={topicClickRail} />
      </div>

      <div className={heroGrid}>
        {itemIds.slice(10, 15).map((id, index) => (
          <ItemCard position={9 + index} key={id} id={id} snowplowId="discover" />
        ))}
      </div>

      {/* Bottom TopicNav */}
      <CardTopicsNav topics={topicList} className="no-border" track={topicClickBottom} />

      <ConfirmReport />
    </Layout>
  )
}
