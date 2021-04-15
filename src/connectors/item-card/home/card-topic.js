import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { topicImpressionEvent } from 'containers/home/home.analytics'
import { topicSaveEvent } from 'containers/home/home.analytics'
import { topicOpenEvent } from 'containers/home/home.analytics'
import { saveHomeItem } from 'containers/home/home.state'
// import { unSaveHomeItem } from 'containers/home/home.state'
// import { topicEngagementEvent } from 'containers/home/home.analytics'
import { setHomeImpression } from 'containers/home/home.state'
import { ActionsTopic } from './card-topic-actions'

export const ItemCard = ({ id, position }) => {
  const dispatch = useDispatch()

  // Get data from state
  const impressionFired = useSelector((state) => state.home.impressions[id])
  const item = useSelector((state) => state.discoverItemsById[id])

  const { save_url, save_status, original_url} = item

  const onItemInView = (inView) => {
    if (impressionFired || !inView) return
    dispatch(topicImpressionEvent(item, position))
    dispatch(setHomeImpression(id))
  }

  const onSave = () => {
    if (save_status !== 'saved') {
      dispatch(saveHomeItem(id, save_url, position))
      dispatch(topicSaveEvent(item, position))
    }
  const onOpen = () => dispatch(topicOpenEvent(item, position))
  }


  return (
    <Card
      id={id}
      position={position}
      item={item}
      onSave={onSave}
      onItemInView={onItemInView}
      openAction={onOpen}
      openUrl={original_url}
      ActionMenu={ActionsTopic}
    />
  )
}
