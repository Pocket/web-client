import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useInView } from 'react-intersection-observer'
import { CollectionCard } from 'components/item-card/home/collection-card'

export const ItemCard = ({
  collection,
  position,
  openAction,
  impressionAction
}) => {
  // Fire item impression
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  useEffect(() => {
    if (inView) impressionAction(collection, position)
  }, [inView])

  const onOpen = () => {
    openAction(collection, index)
  }

  return (
    <CollectionCard
      ref={ref}
      collection={collection}
      onOpen={onOpen}
    />
  )
}
