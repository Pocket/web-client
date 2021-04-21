import React from 'react'
import { ReportIcon } from '@pocket/web-ui'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { OverflowAction } from 'components/item-actions/overflow'
import { useSelector, useDispatch } from 'react-redux'
import { saveHomeItem } from 'containers/home/home.state'
import { trackItemOpen } from 'containers/topic/topic.analytics'
import { trackUnAuthSave } from 'containers/topic/topic.analytics'
import { itemActionStyle } from 'components/item-actions/base'
import { itemReportAction } from 'connectors/items-by-id/discover/items.report'

export function ActionsDiscover({ id, position }) {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.discoverItemsById[id])

  if (!item) return null

  // Prep save action
  const { save_url, save_status, open_url, openExternal } = item
  const url = openExternal ? open_url : `/read/${id}`

  const page = 'topic'
  const onSave = () => {
    return isAuthenticated
      ? dispatch(saveHomeItem(id, save_url, position))
      : dispatch(trackUnAuthSave(position, page))
  }
  const onOpen = () => dispatch(trackItemOpen(item, position, page))
  const onReport = () => dispatch(itemReportAction(id))

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

      <OverflowAction
        menuItems={[
          {
            label: 'Report',
            actionText: 'Report',
            icon: <ReportIcon />,
            onClick: onReport
          }
        ]}
      />
    </div>
  ) : null
}
