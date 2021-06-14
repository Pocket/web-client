import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { publisherRecsRequest } from '/connectors/recit/recit.state'
import { PublisherRecs as RecsComponent } from 'components/content-recs/publisher-recs'
import { trackRecImpression } from './syndicated-article.analytics'
import { trackRecClick } from './syndicated-article.analytics'
import { PUBLISHER_MODULE } from './syndicated-article.analytics'

export function PublisherRecs({ publisher, itemId, legacyId }) {
  const dispatch = useDispatch()

  const publisherRecs = useSelector((state) => state.recit.publisherRecs)
  const recId = useSelector((state) => state.recit.publisherRecId)
  const model = useSelector((state) => state.recit.publisherRecModel)

  const analyticsData = {
    model,
    recId,
    articleId: legacyId,
    module: PUBLISHER_MODULE,
    location: 'Right Rail'
  }

  const handleRecImpression = ({ position, resolvedId }) => {
    trackRecImpression({ position, resolvedId, ...analyticsData })
  }

  const handleRecClick = ({ position, resolvedId }) => {
    trackRecClick({ position, resolvedId, ...analyticsData })
  }

  useEffect(() => {
    dispatch(publisherRecsRequest(itemId))
  }, [dispatch, itemId])

  return (
    <RecsComponent
      recommendations={publisherRecs}
      publisher={publisher}
      maxRecommendations={3}
      handleRecImpression={handleRecImpression}
      handleRecClick={handleRecClick}
    />
  )
}
