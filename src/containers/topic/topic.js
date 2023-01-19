import Layout from 'layouts/main'
import { useSelector } from 'react-redux'

import ErrorPage from 'pages/_error'
import TopicCollection from './topic-collection'
import TopicPage from './topic-page'
import { ConfirmReport } from 'connectors/confirm/report'
import { CallOutBuildHome } from 'components/call-out/call-out-build-home'

import { BASE_URL } from 'common/constants'

export default function Topic({ locale, statusCode = 500 }) {
  // Is user logged in?
  const isAuthenticated = useSelector((state) => state.user?.auth)
  const userStatus = useSelector((state) => state.user?.user_status)
  const shouldRender = userStatus !== 'pending'

  // Select state to use
  const topicList = useSelector((state) => state.topicList?.topicsByName)
  const activeTopic = useSelector((state) => state.topicList?.activeTopic)

  const searchItems = useSelector((state) => state.discoverTopic?.[activeTopic]?.searchItems) //prettier-ignore
  const curatedItems = useSelector((state) => state.discoverTopic?.[activeTopic]?.curatedItems) //prettier-ignore
  const algorithmicItems = useSelector((state) => state.discoverTopic?.[activeTopic]?.algorithmicItems) //prettier-ignore

  const topic = topicList[activeTopic] || activeTopic
  const title = topic?.display_name || topic
  const slug = topic?.topic_slug || topic

  // Error if no items are available
  if (!curatedItems?.length && !algorithmicItems?.length) {
    return <ErrorPage statusCode={statusCode} />
  }

  const RenderComponent = PageToRender(topic?.page_type)

  const languagePrefix = locale === 'en' ? '' : `/${locale}`
  const canonical = `${BASE_URL}${languagePrefix}/explore/${slug}`
  const url = canonical

  const topicMetaData = {
    url,
    description: topic?.social_description,
    image: topic?.social_image,
    title: topic?.social_title
  }

  return (
    <Layout title={`Pocket: ${title}`} metaData={topicMetaData} canonical={canonical}>
      {!isAuthenticated && shouldRender ? <CallOutBuildHome /> : null}

      <RenderComponent
        topic={topic}
        searchItems={searchItems}
        curatedItems={curatedItems}
        algorithmicItems={algorithmicItems}
      />
      <ConfirmReport />
    </Layout>
  )
}

const PageToRender = (topicPage) => {
  switch (topicPage) {
    case 'editorial_collection': {
      return TopicCollection
    }
    case 'topic_page': {
      return TopicPage
    }
    default: {
      return ErrorPage
    }
  }
}
