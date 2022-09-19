import { useEffect } from 'react'
import { getHomeLineup } from 'containers/home/home.state'
import { useDispatch, useSelector } from 'react-redux'
import { CardLineup } from 'connectors/item-card/home/card-lineup'
import { HomeCollectionHeader } from 'components/headers/home-header'
import { HomeLineupHeader } from 'components/headers/home-header'
import { HomeTopicHeader } from 'components/headers/home-header'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'

export const LegacyHome = () => {
  const dispatch = useDispatch()
  const topicSlates = useSelector((state) => state.home.topicSlates)
  const generalSlates = useSelector((state) => state.home.generalSlates) || []

  const userStatus = useSelector((state) => state.user.user_status)
  const lineupId = '249850f0-61c0-46f9-a16a-f0553c222800'

  useEffect(() => {
    if (userStatus !== 'valid') return
    dispatch(getHomeLineup(lineupId))
  }, [lineupId, userStatus, dispatch])

  const offset = generalSlates?.length || 0

  return (
    <>
      {generalSlates?.map((slateId, index) => (
        <Slate key={slateId} slateId={slateId} pagePosition={index} offset={0} />
      ))}
      {topicSlates?.map((slateId, index) => (
        <Slate key={slateId} slateId={slateId} pagePosition={index} offset={offset} />
      ))}
    </>
  )
}

export const Slate = ({ slateId, pagePosition, offset }) => {
  const dispatch = useDispatch()

  const slate = useSelector((state) => state.home.slatesById[slateId])
  const recs = slate?.recommendations

  if (!slate) return null

  const position = offset + pagePosition
  const { displayName, description, topicSlug, type } = slate

  const recCounts = [5, 5, 3]
  const recCount = recCounts[position] || 5
  const recSlice = recs.slice(0, recCount)

  const layoutTypes = [Lockup, OffsetList, OffsetList, Lockup]
  const LayoutType = layoutTypes[position] || OffsetList

  const heroPositions = ['left', '', 'left', 'left']
  const heroPosition = heroPositions[position]

  const cardShapes = [undefined, 'wide', 'block']
  const cardShape = cardShapes[position]

  const headerTypes = {
    collection: HomeCollectionHeader,
    topic: HomeTopicHeader
  }

  const HomeHeader = headerTypes[type] || HomeLineupHeader

  const topicClickEvent =  () => dispatch(sendSnowplowEvent('home.topic.view-more', { label: topicSlug })) //prettier-ignore
  const collectionClickEvent = () => dispatch(sendSnowplowEvent('home.collection.view-more'))
  const onClickEvent = type === 'collection' ? collectionClickEvent : topicClickEvent

  return (
    <SectionWrapper>
      <HomeHeader
        sectionTitle={displayName}
        sectionDescription={description}
        topicSlug={topicSlug}
        onClickEvent={onClickEvent}
      />

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
