import React from 'react'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { itemActionStyle } from 'components/item-actions/base'
import { useSelector, useDispatch } from 'react-redux'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

import { mutationUpsertTransitionalItem } from 'connectors/items/mutation-upsert.state'
import { mutationDeleteTransitionalItem } from 'connectors/items/mutation-delete.state'

export function ActionsRec({ id, position }) {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.itemsDisplay[id])

  const saveItemId = useSelector((state) => state.itemsTransitions[id])
  const saveStatus = saveItemId ? 'saved' : 'unsaved'

  if (!item) return null
  const { saveUrl, readUrl, externalUrl, openExternal } = item
  const data = { id, url: saveUrl, position }

  // Prep save action
  const onSave = () => {
    dispatch(mutationUpsertTransitionalItem(saveUrl, id))
    dispatch(sendSnowplowEvent('reader.rec.save', data))
  }

  const onUnSave = () => {
    dispatch(sendSnowplowEvent('reader.rec.unsave', data))
    dispatch(mutationDeleteTransitionalItem(saveItemId, id))
  }

  const saveAction = saveItemId ? onUnSave : onSave

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
        saveAction={saveAction}
        isAuthenticated={isAuthenticated}
        saveStatus={saveStatus}
        id={id}
      />
    </div>
  ) : null
}
