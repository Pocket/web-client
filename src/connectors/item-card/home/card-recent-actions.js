import React from 'react'
import { itemActionStyle } from 'components/item-actions/base'
import { useSelector, useDispatch } from 'react-redux'
import { getSimilarRecs } from 'containers/home/home.state'
import { ShowSimilar } from 'components/item-actions/show-similar'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export function ActionsRecent({ id, position }) {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.myListItemsById[id])

  if (!item) return null

  // Similar action
  const onSimilar = () => {
    const data = { id, position, ...item?.analyticsData }
    dispatch(sendSnowplowEvent('home.similar.show', data))
    dispatch(getSimilarRecs(id))
  }

  return item ? (
    <div className={`${itemActionStyle} actions`}>
      <ShowSimilar id={id} similarAction={onSimilar} />
    </div>
  ) : null
}
