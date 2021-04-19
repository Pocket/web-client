import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsDiscover } from './card-actions'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({
  id,
  position,
  className,
  cardShape,
  showExcerpt = false,
  saveAction,
  unSaveAction,
  unAuthSaveAction,
  openAction,
  reportFeedbackAction
}) {
  // Get data from state
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.discoverItemsById[id])

  const { save_url, save_status, original_url} = item
  const dispatch = useDispatch()
  
  const onSave = (isAuthenticated) => {
    if (isAuthenticated) {
      if (save_status === 'saved') dispatch(unSaveAction(id))
      if (save_status !== 'saved') dispatch(saveAction(id, save_url, position))
      return
    }

    // Not authenticated so just tracking the click
    unAuthSaveAction(position)
  }

  const onOpen = () => openAction(position, item)

  return (
    <Card
    item={item}
    className={className}
    cardShape={cardShape}
    onOpen={onOpen}
    openUrl={original_url}
    onSave={onSave}
    itemType="message"
    showExcerpt={showExcerpt}
    onReportFeedback={() => reportFeedbackAction(item)}
    isAuthenticated={isAuthenticated}
    ActionMenu={ActionsDiscover}
    
    />
  )
}
