import { Card } from 'components/item-card/card'
import { useSelector } from 'react-redux'

export const RecentCard = ({ id, position }) => {
  // Get data from state
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.myListItemsById[id])

  const saveAction = () => {
    console.log('Saving:', id)
  }

  const impressionAction = () => {}
  const engagementAction = () => {}
  const openAction = () => {}

  return item ? (
    <Card
      item={item}
      position={position}
      itemType="myList"
      showExcerpt={true}
      saveAction={saveAction}
      impressionAction={impressionAction}
      engagementAction={engagementAction}
      openAction={openAction}
      isAuthenticated={isAuthenticated}
    />
  ) : null
}
