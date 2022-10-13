import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { HomeHeader } from 'components/headers/home-header'
import { useDispatch, useSelector } from 'react-redux'
import { getRecentSaves } from 'containers/home/home.state'
import { RecentCard } from 'connectors/item-card/home/card-recent'
import { FlexList } from 'components/items-layout/list-flex'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const HomeRecentSaves = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const recentSaves = useSelector((state) => state.home.recentSaves)
  const count = recentSaves.length
  const showExcerpt = count < 2

  const onLinkClick = () => dispatch(sendSnowplowEvent('home.recent.view-my-list'))

  // Initialize data
  useEffect(() => {
    dispatch(getRecentSaves())
  }, [dispatch])

  return recentSaves?.length > 0 ? (
    <>
      <HomeHeader
        headline={t('home:recent-saves-title', 'Recent Saves to My List')}
        moreLinkText={t('home:recent-saves-my-list-link-text', 'Go to My List')}
        moreLinkUrl={'/my-list?src=recent-saves'}
        moreLinkClick={onLinkClick}
      />

      <FlexList
        items={recentSaves}
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
