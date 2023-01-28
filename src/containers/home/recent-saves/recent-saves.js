import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { HomeHeader } from 'components/headers/home-header'
import { useDispatch, useSelector } from 'react-redux'
import { getItemsUnread } from 'containers/saves/saved-items/saved-items.state'
import { FlexList } from 'components/items-layout/list-flex'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { Card } from 'components/item-card/card'
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
    </SectionWrapper>
  ) : null
}

export const RecentCard = ({
  id,
  position,
  className,
  cardShape = 'block',
  showMedia = true,
  showExcerpt = false
}) => {
  const dispatch = useDispatch()

  // Get data from state
  const item = useSelector((state) => state.itemsDisplay[id])
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))

  if (!item) return null

  const { itemId, openExternal, readUrl, externalUrl } = item
  const openUrl = readUrl && !openExternal ? readUrl : externalUrl
  const analyticsData = {
    id,
    position,
    destination: !openExternal ? 'internal' : 'external',
    ...item?.analyticsData
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onOpenOriginalUrl = () => {
    const data = { ...analyticsData, destination: 'external' }
    dispatch(sendSnowplowEvent('home.recent.view-original', data))
  }
  const onOpen = () => dispatch(sendSnowplowEvent('home.recent.open', analyticsData))
  const onImpression = () => dispatch(sendSnowplowEvent('home.recent.impression', analyticsData))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)

  const itemImage = item?.noImage ? '' : item?.thumbnail
  const {tags, title, publisher, excerpt, timeToRead, isSyndicated, isInternalItem, fromPartner } = item //prettier-ignore

  return item ? (
    <Card
      itemId={itemId}
      externalUrl={externalUrl}
      tags={tags}
      title={title}
      itemImage={itemImage}
      publisher={publisher}
      excerpt={excerpt}
      timeToRead={timeToRead}
      isSyndicated={isSyndicated}
      isInternalItem={isInternalItem}
      fromPartner={fromPartner}
      position={position}
      className={className}
      cardShape={cardShape}
      showExcerpt={showExcerpt}
      showMedia={showMedia}
      openUrl={openUrl}
      // Tracking
      onItemInView={onItemInView}
      onOpen={onOpen}
      onOpenOriginalUrl={onOpenOriginalUrl}
    />
  ) : null
}
