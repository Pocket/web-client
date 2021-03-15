import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { setRecImpression } from 'connectors/recit/recit.state'
import { readerRecSaveItem } from 'connectors/recit/recit.state'
import { readerRecUnSaveItem } from 'connectors/recit/recit.state'
import { readerRecImpressionEvent } from 'connectors/recit/recit.analytics'
import { readerRecSaveEvent } from 'connectors/recit/recit.analytics'
import { readerRecEngagementEvent } from 'connectors/recit/recit.analytics'
import { readerRecOpenEvent } from 'connectors/recit/recit.analytics'

export const RecCard = ({ id, position }) => {
  const dispatch = useDispatch()

  // Get data from state
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.recit.readerRecs[id])
  const impressions = useSelector((state) => state.recit.impressions)

  // Prep save action
  const { save_url, save_status } = item
  const onSave = () => {
    dispatch(readerRecSaveItem(id, save_url, position))
    dispatch(readerRecSaveEvent(item, position))
  }

  const onOpen = () => {
    dispatch(readerRecOpenEvent(item, position))
  }

  const impressionAction = () => {
    if (!impressions[id]) {
      dispatch(readerRecImpressionEvent(item, position))
      dispatch(setRecImpression(id))
    }
  }

  const engagementAction = () => {
    dispatch(readerRecUnSaveItem(id))
    dispatch(readerRecEngagementEvent(item, position))
  }

  return item ? (
    <Card
      item={item}
      position={position}
      cardShape="block"
      itemType="message"
      showExcerpt={true}
      saveAction={onSave}
      impressionAction={impressionAction}
      engagementAction={engagementAction}
      openAction={onOpen}
      isAuthenticated={isAuthenticated}
    />
  ) : null
}
