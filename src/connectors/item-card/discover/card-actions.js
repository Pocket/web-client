import React from 'react'
import { ReportIcon } from 'components/icons/ReportIcon'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { OverflowAction } from 'components/item-actions/overflow'
import { useSelector, useDispatch } from 'react-redux'
import { saveDiscoverItem } from 'containers/discover/discover.state'
import { useTranslation } from 'next-i18next'

import { itemActionStyle } from 'components/item-actions/base'
import { itemReportAction } from 'connectors/items/mutation-report.state'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export function ActionsDiscover({ id, position }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.discoverItemsById[id])

  if (!item) return null
  const { saveStatus, saveUrl, externalUrl, openExternal } = item
  const analyticsData = { position, ...item?.analyticsData }

  // Prep save action
  const onSave = () => {
    dispatch(saveDiscoverItem(id, saveUrl, position))
    dispatch(sendSnowplowEvent('discover.save', analyticsData))
  }

  // Open action
  const url = externalUrl

  const onOpen = () => {
    const data = {
      ...analyticsData,
      url,
      destination: openExternal ? 'external' : 'internal'
    }
    dispatch(sendSnowplowEvent('discover.open', data))
  }

  // On Report
  const onReport = () => dispatch(itemReportAction(id))

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

      <OverflowAction
        menuItems={[
          {
            label: t('item-action:report', 'Report'),
            actionText: t('item-action:report', 'Report'),
            icon: <ReportIcon />,
            onClick: onReport
          }
        ]}
      />
    </div>
  ) : null
}
