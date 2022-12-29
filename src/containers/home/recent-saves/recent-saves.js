import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { HomeHeader } from 'components/headers/home-header'
import { useDispatch, useSelector } from 'react-redux'
import { RecentCard } from './card'
import { FlexList } from 'components/items-layout/list-flex'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { getItemsUnread } from 'containers/saves/saved-page/saved-page.state'

export const HomeRecentSaves = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const recentSavesIds = useSelector((state) => state.pageSavedIds)
  const count = recentSavesIds?.length
  const showExcerpt = count < 2

  const onLinkClick = () => dispatch(sendSnowplowEvent('home.recent.view-saves'))

  // Initialize data
  useEffect(() => {
    dispatch(getItemsUnread())
  }, [dispatch])

  return recentSavesIds?.length > 0 ? (
    <>
      <HomeHeader
        headline={t('home:recent-saves-title', 'Recent Saves')}
        moreLinkText={t('home:recent-saves-link-text', 'Go to Saves')}
        moreLinkUrl={'/saves?src=recent-saves'}
        moreLinkClick={onLinkClick}
      />

      <FlexList
        items={recentSavesIds}
        offset={0}
        count={3}
        ItemCard={RecentCard}
        cardShape="flex"
        showExcerpt={showExcerpt}
        border={false}
        compact={true}
        dataCy="recent-saves"
      />
    </>
  ) : null
}
