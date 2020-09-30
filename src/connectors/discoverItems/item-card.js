import { useEffect } from 'react'
import { Card } from 'components/card/card'
import { useSelector, useDispatch } from 'react-redux'
import { useInView } from 'react-intersection-observer'
import { fireItemImpression, fireItemOpen } from './items.analytics'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({
  id,
  position,
  positionZeroIndex,
  saveAction,
  unSaveAction,
  impressionAction,
  unAuthSaveAction,
  openAction,
  reportFeedbackAction
}) {
  // Get data from state
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.discoverItemsById[id])

  const { save_url, save_status } = item
  const dispatch = useDispatch()

  // Fire item impression
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  useEffect(
    //prettier-ignore
    () => fireItemImpression(position, positionZeroIndex,item,inView,impressionAction,dispatch),
    [position, item, inView, impressionAction]
  )

  const onSave = (isAuthenticated) => {
    if (isAuthenticated) {
      if (save_status === 'saved') dispatch(unSaveAction(id))
      if (save_status !== 'saved') dispatch(saveAction(id, save_url, position))
      return
    }

    // Not authenticated so just tracking the click
    unAuthSaveAction(position)
  }

  const onOpen = () => {
    openAction(position, item)
    fireItemOpen(positionZeroIndex, item, dispatch)
  }

  return (
    <Card
      ref={ref}
      item={item}
      onOpen={onOpen}
      onSave={onSave}
      onReportFeedback={() => reportFeedbackAction(item)}
      isAuthenticated={isAuthenticated}
    />
  )
}
