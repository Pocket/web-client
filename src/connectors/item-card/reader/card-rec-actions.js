import React from 'react'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { itemActionStyle } from 'components/item-actions/base'
import { useSelector, useDispatch } from 'react-redux'
import { readerRecSaveItem } from 'connectors/recit/recit.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export function ActionsRec({ id, position }) {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.recit.readerRecs[id])

  if (!item) return null
  const { saveUrl, saveStatus, readUrl, externalUrl, openExternal } = item

  // Prep save action
  const onSave = () => {
    const data = { id, url: saveUrl, position }
    dispatch(readerRecSaveItem(id, saveUrl, position))
    dispatch(sendSnowplowEvent('reader.rec.save', data))
  }

  // Open action
  const url = openExternal ? externalUrl : readUrl
  const onOpen = () => {
    const data = { id, url, position, destination: 'internal' }
    dispatch(sendSnowplowEvent('reader.rec.open', data))
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
        saveStatus={saveStatus}
        id={id}
      />
    </div>
  ) : null
}
