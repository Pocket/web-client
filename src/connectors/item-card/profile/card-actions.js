import React from 'react'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { OverflowAction } from 'components/item-actions/overflow'
import { itemActionStyle } from 'components/item-actions/base'
import { useSelector, useDispatch } from 'react-redux'
import { saveRecommendedItem } from 'connectors/items-by-id/profile/items.state'
import { deleteRecommendedItem } from 'connectors/items-by-id/profile/items.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { DeleteIcon } from 'components/icons/DeleteIcon'

export function ActionsFeed({ id, position }) {
  const dispatch = useDispatch()

  const uid = useSelector((state) => state.userProfile.uid)
  const isSelf = useSelector((state) => state.user.user_id === uid)
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.profileItemsByIds.itemsById[id])
  if (!item) return null

  const { saveUrl, saveStatus, readUrl, externalUrl, openExternal } = item
  const { post, analyticsData } = item

  // Prep save action
  const onSave = () => {
    const data = { id, position, ...item?.analyticsData }
    dispatch(sendSnowplowEvent('profile.feed.save', data))
    dispatch(saveRecommendedItem(id, saveUrl, position))
  }

  // Open action
  const url = readUrl && !openExternal ? readUrl : externalUrl
  const onOpen = () => {
    const data = { ...analyticsData, url, destination: 'internal' }
    dispatch(sendSnowplowEvent('profile.feed.open', data))
  }

  const onDelete = () => {
    dispatch(sendSnowplowEvent('profile.feed.delete', analyticsData))
    dispatch(deleteRecommendedItem(post?.post_id, id))
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
      {isSelf ? (
        <OverflowAction
          menuItems={[
            {
              label: 'Delete',
              icon: <DeleteIcon />,
              onClick: onDelete
            }
          ]}
        />
      ) : null}
    </div>
  ) : null
}
