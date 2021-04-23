import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { saveHomeItem } from 'containers/home/home.state'
import { recSaveEvent } from 'containers/home/home.analytics'
import { recOpenEvent } from 'containers/home/home.analytics'
import { recImpressionEvent } from 'containers/home/home.analytics'
import { setHomeImpression } from 'containers/home/home.state'

export const RecCard = ({ id, position, cardShape = 'detail' }) => {
  const dispatch = useDispatch()

  // Get data from state
  const isAuthenticated = useSelector((state) => state.user.auth)
  const impressions = useSelector((state) => state.home.impressions)
  const item = useSelector((state) => state.recit.recentRecs[id])

  // Prep save action
  const { save_url } = item
  const onSave = (isAuthenticated) => {
    dispatch(saveHomeItem(id, save_url, position))
    dispatch(recSaveEvent(item, position))
  }

  // Prep open Action
  const onOpen = () => {
    dispatch(recOpenEvent(item, position))
  }

  // Prep analytics
  const impressionAction = () => {
    if (!impressions[id]) {
      dispatch(recImpressionEvent(item, position))
      dispatch(setHomeImpression(id))
    }
  }

  return item ? (
    <Card
      item={item}
      position={position}
      cardShape={cardShape}
      itemType="message"
      showExcerpt={true}
      saveAction={onSave}
      impressionAction={impressionAction}
      openAction={onOpen}
      isAuthenticated={isAuthenticated}
    />
  ) : null
}
