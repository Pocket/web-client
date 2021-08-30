import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HomeGreeting } from 'containers/home/personalized/home-greeting'
import { HomeRecentSaves } from 'containers/home/personalized/home-recent-saves'
import { getHomeLineup } from 'containers/home/home.state'
import { CardLineup } from 'connectors/item-card/home/card-lineup'
import { HomeLineupHeader, HomeLineupSpacer } from 'components/headers/home-header'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'
import Layout from 'layouts/main'
import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'
import { ShareModal } from 'connectors/confirm-share/confirm-share'
import { ArchiveModal } from 'connectors/confirm-archive/confirm-archive'
import { FavoriteModal } from 'connectors/confirm-favorite/confirm-favorite'
import { Toasts } from 'connectors/toasts/toast-list'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { HomeSimilarRecs } from 'containers/home/personalized/home-similar-recs'

export const HomePersonalized = ({ metaData, showLanguages }) => {
  const dispatch = useDispatch()
  const slates = useSelector((state) => state.home.slates)
  const slatesNoTopics = slates

  // Initialize data
  useEffect(() => dispatch(getHomeLineup()), [dispatch])

  return (
    <Layout metaData={metaData} isFullWidthLayout={true} showLanguages={showLanguages}>
      <SectionWrapper>
        <HomeGreeting />
        <HomeRecentSaves />
      </SectionWrapper>

      {slatesNoTopics.map((slateId, index) => (
        <Slate key={slateId} slateId={slateId} pagePosition={index} />
      ))}

      <HomeSimilarRecs />
      <DeleteModal />
      <TaggingModal />
      <ShareModal />
      <ArchiveModal />
      <FavoriteModal />
      <Toasts />
    </Layout>
  )
}

export const Slate = ({ slateId, pagePosition }) => {
  const slate = useSelector((state) => state.home.slatesById[slateId])
  const recs = slate?.recommendations

  if (!slate) return null
  const { displayName, description } = slate
  const positionsWithHeadlines = [0, 2, 3, 4]
  const showHeader = positionsWithHeadlines.includes(pagePosition)

  const positionsWithSpacers = [1]
  const showSpacer = positionsWithSpacers.includes(pagePosition)

  const recCounts = [5, 5, 3]
  const recCount = recCounts[pagePosition] || 5
  const recSlice = recs.slice(0, recCount)

  const layoutTypes = [Lockup, OffsetList, OffsetList, Lockup, OffsetList, OffsetList, OffsetList]
  const LayoutType = layoutTypes[pagePosition] || Lockup

  const heroPositions = ['center', '', 'left', 'right']
  const heroPosition = heroPositions[pagePosition]

  const cardShapes = [undefined, 'wide', 'block']
  const cardShape = cardShapes[pagePosition]

  const displaysFull = [2]
  const displayFull = displaysFull.includes(pagePosition)
  const wrapperClass = displayFull ? 'highlight' : ''

  return (
    <SectionWrapper className={wrapperClass}>
      {showHeader ? (
        <HomeLineupHeader sectionTitle={displayName} sectionDescription={description} />
      ) : null}
      {showSpacer ? <HomeLineupSpacer /> : null}
      <LayoutType
        items={recSlice}
        offset={0}
        heroPosition={heroPosition}
        ItemCard={CardLineup}
        cardShape={cardShape}
        border={false}
      />
    </SectionWrapper>
  )
}
