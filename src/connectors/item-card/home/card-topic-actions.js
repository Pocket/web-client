import React from 'react'
import { itemActionStyle } from 'components/item-actions/base'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { useSelector, useDispatch } from 'react-redux'
import { saveHomeItem } from 'containers/home/home.state'
import { topicOpenEvent } from 'containers/home/home.analytics'
import { topicSaveEvent } from 'containers/home/home.analytics'

export function ActionsTopic({ id, position }) {
  const dispatch = useDispatch()

  // Get data from state
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.discoverItemsById[id])

  if (!item) return null

  // Prep save action
  const { save_url, save_status, open_url, openExternal } = item
  const onSave = () => {
    if (save_status !== 'saved') {
      dispatch(saveHomeItem(id, save_url, position))
      dispatch(topicSaveEvent(item, position))
    }
  }

  const onOpen = () => dispatch(topicOpenEvent(item, position))
  const url = openExternal ? open_url : `/read/${id}`

  return (
    <div className={`${itemActionStyle} actions`}>
      <SaveToPocket
        allowRead={true}
        url={url}
        onOpen={onOpen}
        openExternal={openExternal}
        saveAction={onSave}
        isAuthenticated={isAuthenticated}
        saveStatus={save_status}
        id={id}
      />
    </div>
  )
}
