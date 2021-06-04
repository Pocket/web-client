import React from 'react'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { useSelector, useDispatch } from 'react-redux'
import { saveCollection } from 'containers/collections/collections.state'

import { itemActionStyle } from 'components/item-actions/base'

import { trackItemSave } from 'connectors/snowplow/snowplow.state'
import { trackItemOpen } from 'connectors/snowplow/snowplow.state'

export function ActionsCollection({ id, position }) {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.collectionsBySlug[id])

  if (!item) return null

  const { save_url: url, save_status = 'unsaved' } = item

  // Prep save action
  const onSave = () => {
    dispatch(saveCollection(id, url))
    dispatch(trackItemSave(position, { url }, 'collection.save'))
  }

  // Open action
  const onOpen = () => dispatch(trackItemOpen(position, { url }, 'collection.open', url))

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
