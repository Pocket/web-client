import React from 'react'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { itemActionStyle } from 'components/item-actions/base'
import { useSelector, useDispatch } from 'react-redux'
import { saveHomeItem } from 'containers/home/home.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export function ActionsRec({ id, position }) {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.recit.recentRecs[id])

  if (!item) return null
  const { save_url, save_status, open_url, openExternal } = item

  // Prep save action
  const onSave = () => {
    const data = { id, url: save_url, position }
    dispatch(sendSnowplowEvent('home.rec.save', data))
    dispatch(saveHomeItem(id, save_url, position))
  }

  // Open action
  const url = openExternal ? open_url : `/read/${id}`
  const onOpen = () => {
    const data = { id, url, position, destination: 'internal' }
    dispatch(sendSnowplowEvent('home.rec.open', data))
  }

  return item ? (
    <div className={`${itemActionStyle} actions`}>
      <SaveToPocket
        allowRead={false}
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
