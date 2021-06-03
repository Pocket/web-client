import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { publisherRecsRequest } from '/connectors/recit/recit.state'
import { PublisherRecs as RecsComponent } from 'components/content-recs/publisher-recs'
import { trackRecImpression } from '/connectors/recit/recit.analytics'
import { trackRecClick } from '/connectors/recit/recit.analytics'

export function PublisherRecs({ publisher, itemId, legacyId }) {
  const dispatch = useDispatch()

  const publisherRecs = useSelector((state) => state.recit.publisherRecs)
  const recId = useSelector((state) => state.recit.publisherRecId)
  const model = useSelector((state) => state.recit.publisherRecModel)

  const trackBase = { model, recId, articleId: legacyId }

  const handleRecImpression = ({ position, resolvedId, module, location }) => {
    trackRecImpression({ position, resolvedId, module, location, ...trackBase })
  }

  const handleRecClick = ({ position, resolvedId, module, location }) => {
    trackRecClick({ position, resolvedId, module, location, ...trackBase })
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
