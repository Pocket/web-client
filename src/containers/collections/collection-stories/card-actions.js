import React from 'react'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { useSelector, useDispatch } from 'react-redux'
import { mutationUpsert } from 'connectors/items/mutation-upsert.state'
import { mutationDelete } from 'connectors/items/mutation-delete.state'
import { itemActionStyle } from 'components/item-actions/base'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export function ActionsStory({ id, position }) {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.itemsDisplay[id])

  if (!item) return null

  const { saveUrl, saveStatus = 'unsaved' } = item
  const analyticsData = {
    position,
    destination: 'external',
    ...item?.analyticsData
  }

    // Prep save action
    const onSave = () => {
      dispatch(sendSnowplowEvent('collection.story.save', analyticsData))
      dispatch(mutationUpsert(saveUrl))
    }
  
    const onUnSave = () => {
      dispatch(sendSnowplowEvent('discover.unsave', analyticsData))
      dispatch(mutationDelete(id))
    }

  // Open action
  const onOpen = () => dispatch(sendSnowplowEvent('collection.story.open', analyticsData))

  return item ? (
    <div className={`${itemActionStyle} actions`}>
      <SaveToPocket
        allowRead={false}
        url={saveUrl}
        onOpen={onOpen}
        openExternal={false}
        saveAction={onSave}
        isAuthenticated={isAuthenticated}
        saveStatus={saveStatus}
        id={id}
      />
    </div>
  ) : null
}
