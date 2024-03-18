import { useDispatch, useSelector } from 'react-redux'
import { PublisherRecs as RecsComponent } from 'components/content-recs/publisher-recs'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const PublisherRecs = ({ publisher }) => {
  const dispatch = useDispatch()

  const articleData = useSelector((state) => state.syndicatedArticle.articleData)
  const { relatedRightRail } = articleData

  const handleRecImpression = ({ position, corpusRecommendationId, url }) => {
    const analyticsData = { position, corpusRecommendationId, url }
    dispatch(sendSnowplowEvent('syndicated.rec.sidebar.impression', analyticsData))
  }

  const handleRecClick = ({ position, corpusRecommendationId, url }) => {
    const analyticsData = { position, corpusRecommendationId, url }
    dispatch(sendSnowplowEvent('syndicated.rec.sidebar.open', analyticsData))
  }

  return (
    <RecsComponent
      recommendations={relatedRightRail}
      publisher={publisher}
      maxRecommendations={3}
      handleRecImpression={handleRecImpression}
      handleRecClick={handleRecClick}
    />
  )
}
