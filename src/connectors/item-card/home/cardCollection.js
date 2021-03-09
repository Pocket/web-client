import { useEffect } from 'react'

import { useInView } from 'react-intersection-observer'
import { CollectionCard } from 'components/item-card/home/collection-card'
import { collectionImpressionEvent } from 'containers/home/home.analytics'
import { collectionOpenEvent } from 'containers/home/home.analytics'
import { useDispatch, useSelector } from 'react-redux'

export const ItemCard = ({ collection, position }) => {
  const dispatch = useDispatch()

  const impressionAction = (item, position) => {
    // No need for stored impressions as these won't be regenerated
    dispatch(collectionImpressionEvent(item, position))
  }

  const openAction = (item, position) => {
    dispatch(collectionOpenEvent(item, position))
  }

  // Fire item impression
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  useEffect(() => {
    if (inView) impressionAction(collection, position)
  }, [inView])

  const onOpen = () => openAction(collection)

  return <CollectionCard ref={ref} collection={collection} onOpen={onOpen} />
}
