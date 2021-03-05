import { useEffect } from 'react'
import { Card } from 'components/item-card/home/topic-card'
import { useSelector } from 'react-redux'
import { useInView } from 'react-intersection-observer'

export const ItemCard = ({
  id,
  saveAction,
  impressionAction,
  engagementAction,
  openAction,
  position
}) => {
  // Get data from state
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.discoverItemsById[id])

  const { save_url, save_status } = item

  // Fire item impression
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  useEffect(() => {
    if (inView) impressionAction(item, position, id)
  }, [inView])

  const onSave = () => {
    if (isAuthenticated) {
      if (save_status === 'saved') engagementAction(item, position)
      if (save_status !== 'saved') saveAction(item, id, save_url, position)
      return
    }

    // Not authenticated so just tracking the click
    engagementAction(item, position)
  }

  const onOpen = () => {
    openAction(item, position)
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
