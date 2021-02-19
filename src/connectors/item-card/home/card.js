import { useEffect } from 'react'
import { Card } from 'components/item-card/home/topic-card'
import { useSelector, useDispatch } from 'react-redux'
import { useInView } from 'react-intersection-observer'

export const ItemCard = ({ id, topic, unSaveAction, saveAction, position }) => {
  // Get data from state
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.home.topics[topic]?.itemsById[id])

  const { save_url, save_status } = item
  const dispatch = useDispatch()

  // Fire item impression
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  useEffect(() => {
    // track impression event
    if (inView) console.log('impression')
  }, [inView])

  const onSave = (isAuthenticated) => {
    if (isAuthenticated) {
      if (save_status === 'saved') dispatch(unSaveAction(id, topic))
      if (save_status !== 'saved') dispatch(saveAction(id, topic, save_url, position))
      return
    }

    // Not authenticated so just tracking the click
    // unAuthSaveAction(position)
  }

  const onOpen = () => {
    // track open event
  }

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
