import React from 'react'
import { ReportIcon } from 'components/icons/ReportIcon'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { OverflowAction } from 'components/item-actions/overflow'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'

import { itemActionStyle } from 'components/item-actions/base'
import { itemReportAction } from 'connectors/items/mutation-report.state'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { mutationUpsertTransitionalItem } from 'connectors/items/mutation-upsert.state'
import { mutationDeleteTransitionalItem } from 'connectors/items/mutation-delete.state'

export function ActionsTransitional(props) {
  const { id, position, snowplowId } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.itemsDisplay[id])

  const saveItemId = useSelector((state) => state.itemsTransitions[id])
  const saveStatus = saveItemId ? 'saved' : 'unsaved'

  if (!item) return null
  const { saveUrl, externalUrl, openExternal } = item
  const analyticsData = { position, ...item?.analyticsData }

  // Prep save action
  const onSave = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.save`, analyticsData))
    dispatch(mutationUpsertTransitionalItem(saveUrl, id))
  }

  const onUnSave = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.unsave`, analyticsData))
    dispatch(mutationDeleteTransitionalItem(saveItemId, id))
  }

  const saveAction = saveItemId ? onUnSave : onSave

  // Open action
  const url = externalUrl

  const onOpen = () => {
    const data = { ...analyticsData, url, destination: openExternal ? 'external' : 'internal' }
    dispatch(sendSnowplowEvent(`${snowplowId}.open`, data))
  }

  // On Report
  const onReport = () => dispatch(itemReportAction(id))

  return item ? (
    <div className={`${itemActionStyle} actions`}>
      <SaveToPocket
        allowRead={false}
        url={url}
        hideCopy={false}
        onOpen={onOpen}
        openExternal={openExternal}
        saveAction={saveAction}
        isAuthenticated={isAuthenticated}
        saveStatus={saveStatus}
        id={id}
      />

      {/* <OverflowAction
        menuItems={[
          {
            label: t('item-action:report', 'Report'),
            actionText: t('item-action:report', 'Report'),
            icon: <ReportIcon />,
            onClick: onReport
          }
        ]}
      /> */}
    </div>
  ) : null
}
