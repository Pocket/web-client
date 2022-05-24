// Removed from Home on 5/24/22
import { itemActionStyle } from 'components/item-actions/base'
import { useSelector, useDispatch } from 'react-redux'
import { getSimilarRecs } from 'containers/home/home.state'
import { ShowSimilar } from 'components/item-actions/show-similar'

export function ActionsRecent({ id }) {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.myListItemsById[id])

  if (!item) return null

  // Similar action
  const onSimilar = () => {
    dispatch(getSimilarRecs(id))
  }

  return item ? (
    <div className={`${itemActionStyle} actions`}>
      <ShowSimilar id={id} similarAction={onSimilar} />
    </div>
  ) : null
}
