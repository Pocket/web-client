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
  const { saveUrl, corpusRecommendationId } = item
  const analyticsData = {
    corpusRecommendationId,
    url: saveUrl,
    position,
    destination: 'external'
  }

  console.log({ corpusRecommendationId, id })

  // Prep save action
  const onSave = () => {
    dispatch(mutationUpsertTransitionalItem(saveUrl, id))
    dispatch(sendSnowplowEvent('reader.rec.save', analyticsData))
  }

  const onUnSave = () => {
    dispatch(sendSnowplowEvent('reader.rec.unsave', analyticsData))
    dispatch(mutationDeleteTransitionalItem(saveItemId, id))
  }

  const saveAction = saveItemId ? onUnSave : onSave

  // Open action
  const onOpen = () => {
    dispatch(sendSnowplowEvent('reader.rec.open', analyticsData))
  }

  return item ? (
    <div className={`${itemActionStyle} actions`}>
      <SaveToPocket
        allowRead={false}
        url={saveUrl}
        onOpen={onOpen}
        saveAction={saveAction}
        isAuthenticated={isAuthenticated}
        saveStatus={saveStatus}
        id={id}
      />
    </div>
  ) : null
}
