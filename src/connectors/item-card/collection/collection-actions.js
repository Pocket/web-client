import React from 'react'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { useSelector, useDispatch } from 'react-redux'
import { saveCollectionPage } from 'containers/collections/collections.state'

import { itemActionStyle } from 'components/item-actions/base'

import { trackItemSave } from 'connectors/snowplow/snowplow.state'
import { trackItemOpen } from 'connectors/snowplow/snowplow.state'

import { BASE_URL } from 'common/constants'

export function ActionsCollection({ id, position }) {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.collectionsBySlug[id])

  if (!item) return null

  const { url, pageSaveStatus } = item
  const analyticsItem = { url: `${BASE_URL}${url}` }

  // Prep save action
  const onSave = () => {
    dispatch(saveCollectionPage(id))
    dispatch(trackItemSave(position, analyticsItem, 'collection.save'))
  }

  // Open action
  const onOpen = () => dispatch(trackItemOpen(position, analyticsItem, 'collection.open', url))

  return item ? (
    <div className={`${itemActionStyle} actions`}>
      <SaveToPocket
        allowRead={false}
        url={url}
        onOpen={onOpen}
        openExternal={false}
        saveAction={onSave}
        isAuthenticated={isAuthenticated}
        saveStatus={pageSaveStatus}
        id={id}
      />
    </div>
  ) : null
}
