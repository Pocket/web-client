import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pocketRecsRequest } from '/connectors/recit/recit.state'
import RecsComponent from 'components/pocket-recs/pocket-recs'
import { trackRecImpression } from '/connectors/recit/recit.analytics'
import { trackRecClick } from '/connectors/recit/recit.analytics'

export function PocketRecs({ itemId, legacyId }) {
  const dispatch = useDispatch()

  const pocketRecs = useSelector((state) => state.recit.pocketRecs)
  const recId = useSelector((state) => state.recit.pocketRecId)
  const model = useSelector((state) => state.recit.pocketRecModel)
  const trackBase = { model, recId, articleId: legacyId }

  const handleRecImpression = ({ position, resolvedId, module, location }) => {
    trackRecImpression({ position, resolvedId, module, location, ...trackBase })
  }

  const handleRecClick = ({ position, resolvedId, module, location }) => {
    trackRecClick({ position, resolvedId, module, location, ...trackBase })
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
