import React from 'react'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { useSelector, useDispatch } from 'react-redux'
import { saveHomeItem } from 'containers/home/home.state'
import { recSaveEvent } from 'containers/home/home.analytics'
import { recOpenEvent } from 'containers/home/home.analytics'

export function ActionsDiscover({ id, position }) {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.discoverItemsById[id])

  if (!item) return null

  // Prep save action
  const { save_url, save_status, open_url, openExternal } = item

  const onSave = () => {
    dispatch(saveHomeItem(id, save_url, position))
    dispatch(recSaveEvent(item, position))
  }

  const onOpen = () => dispatch(recOpenEvent(item, position))
  const url = openExternal ? open_url : `/read/${id}`

  return item ? (
    <div className="actions">
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
  ) : null
}
