import React from 'react'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { itemActionStyle } from 'components/item-actions/base'
import { useSelector, useDispatch } from 'react-redux'
import { saveHomeItem } from 'containers/home/home.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export function ActionsTopicRec({ id, position }) {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.homeItemsById[id])

  if (!item) return null
  const { saveUrl, readUrl, externalUrl, saveStatus, openExternal } = item
  const analyticsData = { id, position, ...item?.analyticsData }

  // Prep save action
  const onSave = () => {
    dispatch(sendSnowplowEvent('home.lineup.save', analyticsData))
    dispatch(saveHomeItem(id, saveUrl, position))
  }

  // Open action
  const url = readUrl && !openExternal ? readUrl : externalUrl
  const onOpen = () => {
    const destination = saveStatus === 'saved' && !openExternal ? 'internal' : 'external'
    dispatch(sendSnowplowEvent('home.lineup.open', { destination, ...analyticsData }))
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
