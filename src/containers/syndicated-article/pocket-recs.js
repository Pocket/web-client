import { useSelector } from 'react-redux'
import RecsComponent from 'components/pocket-recs/pocket-recs'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const PocketRecs = () => {
  const articleData = useSelector((state) => state.syndicatedArticle.articleData)
  const { relatedEndOfArticle } = articleData

  const handleRecImpression = ({ position, corpusRecommendationId, url }) => {
    const analyticsData = { position, corpusRecommendationId, url }
    sendSnowplowEvent('syndicated.corpus.bottom.impression', analyticsData)
  }

  const handleRecClick = ({ position, corpusRecommendationId, url }) => {
    const analyticsData = { position, corpusRecommendationId, url }
    sendSnowplowEvent('syndicated.corpus.bottom.open', analyticsData)
  }

  return (
    <RecsComponent
      recommendations={relatedEndOfArticle}
      maxRecommendations={5}
      handleRecImpression={handleRecImpression}
      handleRecClick={handleRecClick}
    />
  )
}
