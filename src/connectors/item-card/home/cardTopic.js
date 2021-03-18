import { useEffect } from 'react'
import { Card } from 'components/item-card/home/topic-card'
import { useSelector, useDispatch } from 'react-redux'
import { useInView } from 'react-intersection-observer'
import { topicImpressionEvent } from 'containers/home/home.analytics'
import { topicSaveEvent } from 'containers/home/home.analytics'
import { topicEngagementEvent } from 'containers/home/home.analytics'
import { topicOpenEvent } from 'containers/home/home.analytics'
import { saveHomeItem } from 'containers/home/home.state'
import { unSaveHomeItem } from 'containers/home/home.state'
import { setHomeImpression } from 'containers/home/home.state'

export const ItemCard = ({ id, position }) => {
  const dispatch = useDispatch()

  // Fire item impression
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })

  // Get data from state
  const isAuthenticated = useSelector((state) => state.user.auth)
  const impressions = useSelector((state) => state.home.impressions)

  const item = useSelector((state) => state.discoverItemsById[id])

  const { save_url, save_status } = item

  const onImpression = () => {
    if (!impressions[id]) {
      dispatch(topicImpressionEvent(item, position))
      dispatch(setHomeImpression(id))
    }
  }

  const onSave = () => {
    // preventing Unsaving for now
    // if (save_status === 'saved') {
    //   dispatch(unSaveHomeItem(id))
    //   dispatch(topicEngagementEvent(item, position))
    // }
    if (save_status !== 'saved') {
      dispatch(saveHomeItem(id, save_url, position))
      dispatch(topicSaveEvent(item, position))
    }
  }

  const onOpen = () => {
    dispatch(topicOpenEvent(item, position))
  }

  useEffect(() => {
    if (inView) onImpression()
  }, [inView, id])

  return (
    <Card
      ref={ref}
      item={item}
      onOpen={onOpen}
      onSave={onSave}
      isAuthenticated={isAuthenticated}
    />
  )
}
