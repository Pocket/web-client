import React from 'react'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { OverflowAction } from 'components/item-actions/overflow'
import { itemActionStyle } from 'components/item-actions/base'
import { useSelector, useDispatch } from 'react-redux'
import { saveRecommendedItem } from 'connectors/items-by-id/profile/items.state'
import { deleteRecommendedItem } from 'connectors/items-by-id/profile/items.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { DeleteIcon } from '@pocket/web-ui'

export function ActionsFeed({ id, position }) {
  const dispatch = useDispatch()

  const uid = useSelector((state) => state.userProfile.uid)
  const isSelf = useSelector((state) => state.user.user_id === uid)
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.profileItemsByIds.itemsById[id])

  if (!item) return null
  const { save_url, save_status, open_url, openExternal, post } = item
  const analyticsData = {
    id,
    url: save_url,
    position,
    destination: save_status === 'saved' && !openExternal ? 'internal' : 'external'
  }

  // Prep save action
  const onSave = () => {
    dispatch(sendSnowplowEvent('profile.feed.save', analyticsData))
    dispatch(saveRecommendedItem(id, save_url, position))
  }

  const onDelete = () => {
    dispatch(sendSnowplowEvent('profile.feed.delete', analyticsData))
    dispatch(deleteRecommendedItem(post?.post_id, id))
  }

  // Open action
  const url = openExternal ? open_url : `/read/${id}`
  const onOpen = () => {
    const data = { ...analyticsData, url }
    dispatch(sendSnowplowEvent('profile.feed.open', data))
  }

  return item ? (
    <div className={`${itemActionStyle} actions`}>
      <SaveToPocket
        allowRead={true}
        url={url}
        onOpen={onOpen}
        openExternal={openExternal}
        saveAction={onSave}
        isAuthenticated={isAuthenticated}
        saveStatus={save_status}
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
