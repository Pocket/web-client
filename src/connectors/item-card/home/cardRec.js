import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { saveItem } from 'connectors/recit/recit.state'
import { unSaveItem } from 'connectors/recit/recit.state'
import { saveHomeItem } from 'containers/home/home.state'
import { unSaveHomeItem } from 'containers/home/home.state'
export const RecCard = ({ id, position, cardShape = 'detail' }) => {
  const dispatch = useDispatch()

  // Get data from state
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.recit.recentRecs[id])

  // Prep save action
  const { save_url, save_status } = item
  const onSave = (isAuthenticated) => {
    if (isAuthenticated) {
      if (save_status === 'saved') dispatch(unSaveHomeItem(id))
      if (save_status !== 'saved') {
        dispatch(saveHomeItem(id, save_url, position))
      }
      return
    }
  }

  // Prep open Action
  const onOpen = () => {
    // openAction(position, item)
    // fireItemOpen(positionZeroIndex, item, dispatch)
  }

  // Prep analytics
  const impressionAction = () => {}
  const engagementAction = () => {}
  return item ? (
    <Card
      item={item}
      position={position}
      cardShape={cardShape}
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
