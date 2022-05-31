import React from 'react'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { itemActionStyle } from 'components/item-actions/base'
import { useSelector, useDispatch } from 'react-redux'
import { saveSimilarRec } from 'connectors/similar/similar.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export function ActionsRec({ id, position }) {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.recit.recentRecs[id])

  if (!item) return null
  const { saveUrl, saveStatus, readUrl, externalUrl, openExternal } = item

  // Prep save action
  const onSave = () => {
    const data = { id, position, ...item?.analyticsData }
    dispatch(sendSnowplowEvent('similar.save', data))
    dispatch(saveSimilarRec(id, saveUrl, position))
  }

  // Open action
  const url = readUrl && !openExternal ? readUrl : externalUrl
  const onOpen = () => {
    const data = { id, url, position, destination: 'internal' }
    dispatch(sendSnowplowEvent('similar.open', data))
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
