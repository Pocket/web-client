import Layout from 'layouts/main'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import ErrorPage from 'pages/_error'
import TopicCollection from './topic-collection'
import TopicPage from './topic-page'
import TopicSearch from './topic-search'
import { trackPageView } from './topic.analytics'
import ReportFeedbackModal from 'components/report-feedback-modal/report-feedback-modal'

export default function Topic(props) {
  const { url = '', statusCode = 500 } = props

  // Select state to use
  const searchItems = useSelector((state) => state.topic?.searchItems)
  const curatedItems = useSelector((state) => state.topic?.curatedItems)
  const algorithmicItems = useSelector((state) => state.topic?.algorithmicItems)
  const topicList = useSelector((state) => state.topicList?.topicsByName)
  const activeTopic = useSelector((state) => state.topicList?.activeTopic)

  const topic = topicList[activeTopic] || activeTopic
  const title = topic?.display_name || topic

  // Track Page View
  useEffect(trackPageView, [])

  const [isOpen, setModalOpen] = useState(false)
  const [itemToReport, setItemToReport] = useState(null)

  const reportFeedbackItem = (item) => {
    setItemToReport(item)
    setModalOpen(true)
  }

  // Error if no items are available
  if (
    !curatedItems?.length &&
    !algorithmicItems?.length &&
    !searchItems?.length
  ) {
    return <ErrorPage statusCode={statusCode} />
  }

  const RenderComponent = PageToRender(topic?.page_type)

  const topicMetaData = {
    url,
    description: topic?.social_description,
    image: topic?.social_image,
    title: topic?.social_title
  }

  const sharedActions = {
    reportFeedbackAction: reportFeedbackItem
  }

  return (
    <Layout title={`Pocket: ${title}`} metaData={topicMetaData}>
      <RenderComponent
        topic={topic}
        searchItems={searchItems}
        curatedItems={curatedItems}
        algorithmicItems={algorithmicItems}
        sharedActions={sharedActions}
      />
      <ReportFeedbackModal
        isOpen={isOpen}
        setModalOpen={setModalOpen}
        itemToReport={itemToReport}
        resetItem={() => setItemToReport(null)}
      />
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
      return TopicSearch
    }
  }
}
