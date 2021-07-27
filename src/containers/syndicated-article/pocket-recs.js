import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pocketRecsRequest } from '/connectors/recit/recit.state'
import RecsComponent from 'components/pocket-recs/pocket-recs'
import { trackRecImpression } from './syndicated-article.analytics'
import { trackRecClick } from './syndicated-article.analytics'
import { POCKET_MODULE } from './syndicated-article.analytics'

export function PocketRecs({ itemId, legacyId }) {
  const dispatch = useDispatch()

  const pocketRecs = useSelector((state) => state.recit.pocketRecs)
  const recId = useSelector((state) => state.recit.pocketRecId)
  const model = useSelector((state) => state.recit.pocketRecModel)
  const analyticsData = {
    model,
    recId,
    articleId: legacyId,
    module: POCKET_MODULE,
    location: 'Bottom'
  }

  const handleRecImpression = ({ position, resolvedId }) => {
    trackRecImpression({ position, resolvedId, ...analyticsData })
  }

  const handleRecClick = ({ position, resolvedId }) => {
    trackRecClick({ position, resolvedId, ...analyticsData })
  }

  useEffect(() => {
    dispatch(pocketRecsRequest(itemId))
  }, [dispatch, itemId])

  return (
    <RecsComponent
      recommendations={pocketRecs}
      maxRecommendations={5}
      handleRecImpression={handleRecImpression}
      handleRecClick={handleRecClick}
    />
  )
}
