import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { HomeUnifiedHeader } from 'components/headers/home-header'
import { useDispatch, useSelector } from 'react-redux'
import { getRecentSaves } from 'containers/home/home.state'
import { RecentCard } from 'connectors/item-card/home/card-recent'
import { FlexList } from 'components/items-layout/list-flex'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import { CardNext } from 'components/item-card/card-next'

export const HomeRecentSaves = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const recentSaves = useSelector((state) => state.home.recentSaves)
  const count = recentSaves.length
  const showExcerpt = count < 2
  const featureState = useSelector((state) => state.features) || {}

  const cardNext = featureFlagActive({ flag: 'home.next', featureState })
  const CardToRender = cardNext ? RecentCardNext : RecentCard

  const onLinkClick = () => dispatch(sendSnowplowEvent('home.recent.view-my-list'))

  // Initialize data
  useEffect(() => {
    dispatch(getRecentSaves())
  }, [dispatch])

  const homeNext = featureFlagActive({ flag: 'home.next', featureState })
  const sectionTitle = homeNext
    ? t('home:recent-saves', 'Recent Saves')
    : t('home:recent-saves-title', 'Recent Saves to My List')

  return recentSaves?.length > 0 ? (
    <>
      <HomeUnifiedHeader
        headline={sectionTitle}
        moreLinkText={t('home:recent-saves-my-list-link-text', 'Go to My List')}
        moreLinkUrl={'/my-list?src=recent-saves'}
        moreLinkClick={onLinkClick}
      />

      <FlexList
        items={recentSaves}
        offset={0}
        count={3}
        ItemCard={CardToRender}
        cardShape="flex"
        showExcerpt={showExcerpt}
        border={false}
        compact={true}
        dataCy="recent-saves"
      />
    </>
  ) : null
}

const RecentCardNext = ({ id, position, showMedia = true, showExcerpt = false }) => {
  const dispatch = useDispatch()

  // Get data from state
  const item = useSelector((state) => state.myListItemsById[id])
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
    <CardNext
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
      className="side-by-side"
      openUrl={openUrl}
      // Tracking
      onItemInView={onItemInView}
      onOpen={onOpen}
      onOpenOriginalUrl={onOpenOriginalUrl}
    />
  ) : null
}