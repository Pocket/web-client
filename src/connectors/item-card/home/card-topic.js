import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { topicImpressionEvent } from 'containers/home/home.analytics'
import { topicOpenEvent } from 'containers/home/home.analytics'
// import { unSaveHomeItem } from 'containers/home/home.state'
// import { topicEngagementEvent } from 'containers/home/home.analytics'
import { setHomeImpression } from 'containers/home/home.state'
import { ActionsTopic } from './card-topic-actions'

export const ItemCard = ({ id, position }) => {
  const dispatch = useDispatch()

  // Get data from state
  const impressionFired = useSelector((state) => state.home.impressions[id])
  const item = useSelector((state) => state.discoverItemsById[id])

  const { original_url } = item

  const onItemInView = (inView) => {
    if (impressionFired || !inView) return
    dispatch(topicImpressionEvent(item, position))
    dispatch(setHomeImpression(id))
  }

  const onOpen = () => dispatch(topicOpenEvent(item, position))

  return (
    <Card
      id={id}
      cardShape="grid"
      position={position}
      item={item}
      onItemInView={onItemInView}
      openAction={onOpen}
      openUrl={original_url}
      ActionMenu={ActionsTopic}
    />
  )
}
