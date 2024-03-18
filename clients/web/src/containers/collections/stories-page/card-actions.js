import React from 'react'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { useSelector, useDispatch } from 'react-redux'
import { itemActionStyle } from 'components/item-actions/base'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

import { mutationUpsertTransitionalItem } from 'connectors/items/mutation-upsert.state'
import { mutationDeleteTransitionalItem } from 'connectors/items/mutation-delete.state'

export function ActionsCollection({ id, position }) {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.itemsDisplay[id])
  const saveItemId = useSelector((state) => state.itemsTransitions[id])

  if (!item) return null

  const saveStatus = saveItemId ? 'saved' : 'unsaved'

  const { saveUrl } = item
  const analyticsData = { position, destination: 'external', ...item?.analyticsData }

  // Prep save action
  const onSave = () => {
    dispatch(sendSnowplowEvent('collection.story.save', analyticsData))
    dispatch(mutationUpsertTransitionalItem(saveUrl, id))
  }

  const onUnSave = () => {
    dispatch(sendSnowplowEvent('collection.story.unsave', analyticsData))
    dispatch(mutationDeleteTransitionalItem(saveItemId, id))
  }
  const saveAction = saveItemId ? onUnSave : onSave

  // Open action
  const onOpen = () => dispatch(sendSnowplowEvent('collection.story.open', analyticsData))

  return item ? (
    <div className={`${itemActionStyle} actions`}>
      <SaveToPocket
        allowRead={false}
        url={saveUrl}
        onOpen={onOpen}
        openExternal={false}
        saveAction={saveAction}
        isAuthenticated={isAuthenticated}
        saveStatus={saveStatus}
        id={id}
      />
    </div>
  ) : null
}
