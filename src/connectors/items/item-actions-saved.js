import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SavedActions } from 'components/item/item-actions'

import { EmptyCircledIcon } from 'components/icons/EmptyCircledIcon'
import { CheckCircledIcon } from 'components/icons/CheckCircledIcon'

import { mutationFavorite } from 'connectors/items/mutation-favorite.state'
import { mutationUnFavorite } from 'connectors/items/mutation-favorite.state'
import { mutationArchive } from 'connectors/items/mutation-archive.state'
import { mutationDelete } from 'connectors/items/mutation-delete.state'
import { mutationUpsert } from 'connectors/items/mutation-upsert.state'
import { mutationTagItem } from 'connectors/items/mutation-tagging.state'

import { shareAction } from 'connectors/items/mutation-share.state'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export function ActionsSaves({ id, snowplowId, visibleCount }) {
  const dispatch = useDispatch()
  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const itemSaved = useSelector((state) => state.itemsSaved[id])
  const { filters, sort } = useSelector((state) => state.pageSavedInfo)
  const position = useSelector((state) => state.pageSavedIds.indexOf(id))
  const item = useSelector((state) => state.itemsDisplay[id])

  if (!itemSaved || !item) return null
  const { isFavorite, isArchived, tags} = itemSaved //prettier-ignore
  const { givenUrl, permanentUrl, analyticsData: passedAnalyticsData } = item
  const analyticsData = { ...passedAnalyticsData, position }

  /** ITEM MENU ITEMS
  --------------------------------------------------------------- */
  const actionShare = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.share`, analyticsData))
    dispatch(shareAction({ item, position }))
  }
  const actionDelete = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.delete`, analyticsData))
    dispatch(mutationDelete(id))
  }
  const actionArchive = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.archive`, analyticsData))
    dispatch(mutationArchive(id))
  }
  const actionUpsert = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.unarchive`, analyticsData))
    dispatch(mutationUpsert(givenUrl, filters, sort, true))
  }
  const actionFavorite = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.favorite`, analyticsData))
    dispatch(mutationFavorite(id))
  }
  const actionUnFavorite = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.un-favorite`, analyticsData))
    dispatch(mutationUnFavorite(id))
  }
  const actionTag = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.tag`, analyticsData))
    dispatch(mutationTagItem(id, tags))
  }

  const actionPermLibOpen = () => {
    const data = { ...analyticsData, url: permanentUrl }
    dispatch(sendSnowplowEvent(`${snowplowId}.card.permanent-library`, data))
  }

  return (
    <SavedActions
      visibleCount={visibleCount}
      isPremium={isPremium}
      isArchived={isArchived}
      isFavorite={isFavorite}
      actionShare={actionShare}
      actionDelete={actionDelete}
      actionArchive={actionArchive}
      actionUpsert={actionUpsert}
      actionFavorite={actionFavorite}
      actionUnFavorite={actionUnFavorite}
      actionTag={actionTag}
      actionPremLibOpen={actionPermLibOpen}
    />
  )
}

export function ActionsBulk({ id }) {
  const bulkList = useSelector((state) => state.mutationBulk.itemIds)
  const selected = bulkList?.includes(id)
  const BulkIcon = selected ? CheckCircledIcon : EmptyCircledIcon
  return (
    <div className="actions">
      <div className="item-actions"></div>
      <div>
        <BulkIcon />
      </div>
    </div>
  )
}
