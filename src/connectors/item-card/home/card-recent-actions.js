import React from 'react'
import { itemActionStyle } from 'components/item-actions/base'
import { useSelector, useDispatch } from 'react-redux'
// import { trackItemOpen } from 'connectors/snowplow/snowplow.state'

export function ActionsRec({ id, position }) {
  // const dispatch = useDispatch()

  // const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.myListItemsById[id])
  // const { open_url, openExternal } = item

  if (!item) return null

  // Open action
  // const url = openExternal ? open_url : `/read/${id}`
  // const onOpen = () => dispatch(trackItemOpen(position, item, 'home.recent.open', url))

  return item ? <div className={`${itemActionStyle} actions`}></div> : null
}
