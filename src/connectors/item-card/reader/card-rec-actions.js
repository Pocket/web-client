import React from 'react'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { itemActionStyle } from 'components/item-actions/base'
import { useSelector, useDispatch } from 'react-redux'
import { readerRecSaveItem } from 'connectors/recit/recit.state'
import { trackItemSave } from 'connectors/snowplow/snowplow.state'
import { trackItemOpen } from 'connectors/snowplow/snowplow.state'

export function ActionsRec({ id, position }) {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.recit.readerRecs[id])

  if (!item) return null
  const { save_url, save_status, open_url, openExternal } = item

  // Prep save action
  const onSave = () => {
    dispatch(readerRecSaveItem(id, save_url, position))
    dispatch(trackItemSave(position, item, 'reader.rec.save'))
  }

  // Open action
  const url = openExternal ? open_url : `/read/${id}`
  const onOpen = () => dispatch(trackItemOpen(position, item, 'reader.rec.open', url))

  return item ? (
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
  ) : null
}
