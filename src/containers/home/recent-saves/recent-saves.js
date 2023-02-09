import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { HomeHeader } from 'components/headers/home-header'
import { useDispatch, useSelector } from 'react-redux'
import { getItemsUnread } from 'containers/saves/saved-items/saved-items.state'
import { listStrata } from 'components/items-layout/list-strata'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { ItemCard } from 'connectors/items/item-card-transitional'
import { HomeGreeting } from './greeting'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'

export const HomeRecentSaves = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const recentSaves = useSelector((state) => state.pageSavedIds)
  const count = recentSaves?.length
  const showExcerpt = count < 2

  const onLinkClick = () => dispatch(sendSnowplowEvent('home.recent.view-saves'))

  // Initialize data
  useEffect(() => {
    dispatch(getItemsUnread())
  }, [dispatch])

  return recentSaves?.length > 0 ? (
    <SectionWrapper>
      <HomeGreeting />

      <HomeHeader
        headline={t('home:recent-saves-title', 'Recent Saves')}
        moreLinkText={t('home:recent-saves-link-text', 'Go to Saves')}
        moreLinkUrl={'/saves?src=recent-saves'}
        moreLinkClick={onLinkClick}
      />

      <div className={`${listStrata} recentCards`}>
        {recentSaves.slice(0, 3).map((id) => (
          <ItemCard key={id} id={id} clamp={true} showExcerpt={showExcerpt} />
        ))}
      </div>
    </SectionWrapper>
  ) : null
}

