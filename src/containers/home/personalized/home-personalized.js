import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HomeGreeting } from 'containers/home/personalized/home-greeting'
import { getHomeLineup } from 'containers/home/home.state'
import { CardLineup } from 'connectors/item-card/home/card-lineup'
import { HomeLineupHeader } from 'components/headers/home-header'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'

export const HomePersonalized = () => {
  const dispatch = useDispatch()
  const slates = useSelector((state) => state.home.slates)
  const slatesNoTopics = slates.slice(0, -3)

  // Initialize data
  useEffect(() => dispatch(getHomeLineup()), [dispatch])

  return (
    <>
      <HomeGreeting />
      {slatesNoTopics.map((slateId, index) => (
        <Slate key={slateId} slateId={slateId} pagePosition={index} />
      ))}
    </>
  )
}

export const Slate = ({ slateId, pagePosition }) => {
  const slate = useSelector((state) => state.home.slatesById[slateId])
  const recs = slate?.recommendations

  if (!slate) return null
  const { displayName, description } = slate
  const positionsWithHeadlines = [0, 2, 3]
  const showHeader = positionsWithHeadlines.includes(pagePosition)

  const layoutTypes = [Lockup, OffsetList]
  const LayoutType = layoutTypes[pagePosition] || Lockup

  const heroPositions = ['center', '', 'left', 'right']
  const heroPosition = heroPositions[pagePosition]

  const cardShapes = [undefined, 'wide']
  const cardShape = cardShapes[pagePosition]
  return (
    <>
      {showHeader ? (
        <HomeLineupHeader sectionTitle={displayName} sectionDescription={description} />
      ) : null}
      <LayoutType
        items={recs}
        offset={0}
        heroPosition={heroPosition}
        ItemCard={CardLineup}
        cardShape={cardShape}
        border={false}
      />
    </>
  )
}
