import React from 'react'
import { itemActionStyle } from 'components/item-actions/base'
import { useSelector, useDispatch } from 'react-redux'
import { getSimilarRecs } from 'containers/home/home.state'
// import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
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
      <ShowSimilar similarAction={onSimilar} />
    </div>
  ) : null
}
