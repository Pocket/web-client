import React from 'react'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { useSelector, useDispatch } from 'react-redux'
import { saveStory } from 'connectors/items-by-id/collection/stories.state'

import { itemActionStyle } from 'components/item-actions/base'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export function ActionsCollection({ id, position }) {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.collectionStoriesById[id])

  if (!item) return null

  const { save_url: url, save_status = 'unsaved' } = item
  const analyticsData = {
    url,
    position,
    destination: 'external'
  }

  // Prep save action
  const onSave = () => {
    dispatch(saveStory(id, url))
    dispatch(sendSnowplowEvent('collection.story.save', analyticsData))
  }

  // Open action
  const onOpen = () => dispatch(sendSnowplowEvent('collection.story.open', analyticsData))

  return item ? (
    <div className={`${itemActionStyle} actions`}>
      <SaveToPocket
        allowRead={false}
        url={url}
        onOpen={onOpen}
        openExternal={false}
        saveAction={onSave}
        isAuthenticated={isAuthenticated}
        saveStatus={save_status}
        id={id}
      />
    </div>
  ) : null
}
