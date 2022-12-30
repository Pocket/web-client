import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { useSelector, useDispatch } from 'react-redux'

import { itemActionStyle } from 'components/item-actions/base'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { BASE_URL } from 'common/constants'
import { mutationUpsert } from 'connectors/items/mutation-upsert.state'
import { mutationDelete } from 'connectors/items/mutation-delete.state'

export function ActionsCollection({ id, position }) {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.collectionsBySlug[id])

  if (!item) return null

  const { url, pageSaveStatus } = item
  const analyticsData = {
    url: `${BASE_URL}${url}`,
    position
  }

  // Prep save action
  const onSave = () => {
    dispatch(sendSnowplowEvent('collection.save', analyticsData))
    dispatch(mutationUpsert(url))
  }

  const onUnSave = () => {
    dispatch(sendSnowplowEvent('collection.unsave', analyticsData))
    dispatch(mutationDelete(id))
  }

  // Open action
  const onOpen = () => dispatch(sendSnowplowEvent('collection.open', analyticsItem))

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
