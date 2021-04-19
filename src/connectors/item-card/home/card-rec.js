import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { recOpenEvent } from 'containers/home/home.analytics'
import { recImpressionEvent } from 'containers/home/home.analytics'
import { setHomeImpression } from 'containers/home/home.state'
import { ActionsRec } from './card-rec-actions'

export const RecCard = ({ id, position, cardShape = 'detail' }) => {
  const dispatch = useDispatch()

  // Get data from state
  const isAuthenticated = useSelector((state) => state.user.auth)
  const impressionFired = useSelector((state) => state.home.impressions[id])
  const item = useSelector((state) => state.recit.recentRecs[id])

  /** ITEM TRACKING
  --------------------------------------------------------------- */
  const onOpen = () => {
    dispatch(recOpenEvent(item, position))
  }

  const onItemInView = (inView) => {
    if (impressionFired || !inView) return
    dispatch(recImpressionEvent(item, position))
    dispatch(setHomeImpression(id))
  }

  const { original_url } = item

  return item ? (
    <Card
      id={id}
      item={item}
      position={position}
      cardShape={cardShape}
      itemType="message"
      showExcerpt={true}
      onItemInView={onItemInView}
      openAction={onOpen}
      openUrl={original_url}
      isAuthenticated={isAuthenticated}
      ActionMenu={ActionsRec}
    />
  ) : null
}
