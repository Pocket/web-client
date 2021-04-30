import React from 'react'
import { ReportIcon } from '@pocket/web-ui'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { OverflowAction } from 'components/item-actions/overflow'
import { useSelector, useDispatch } from 'react-redux'
import { saveDiscoverItem } from 'containers/discover/discover.state'

import { itemActionStyle } from 'components/item-actions/base'
import { itemReportAction } from 'connectors/items-by-id/discover/items.report'

import { trackItemSave } from 'connectors/snowplow/snowplow.state'
import { trackItemOpen } from 'connectors/snowplow/snowplow.state'

export function ActionsDiscover({ id, position }) {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.discoverItemsById[id])
  const { save_url, save_status, open_url, openExternal } = item

  if (!item) return null

  // Prep save action
  const onSave = () => {
    dispatch(saveDiscoverItem(id, save_url, position))
    dispatch(trackItemSave(position, item, 'discover.save'))
  }

  // Open action
  const url = openExternal ? open_url : `/read/${id}`
  const onOpen = () => dispatch(trackItemOpen(position, item, 'discover.open', url))

  // On Report
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
