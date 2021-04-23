import { useEffect, useState } from 'react'
import { HomeSectionHeader } from 'components/headers/home-header'
import { useDispatch, useSelector } from 'react-redux'
import { RecCard } from 'connectors/item-card/home/card-rec'
import { recentRecsRequest } from 'connectors/recit/recit.state'
import { useInView } from 'react-intersection-observer'
import { Lockup } from 'components/items-layout/list-lockup'

export const HomeRecentRecsList = () => {
  const dispatch = useDispatch()
  const [shouldPopulate, setShouldPopulate] = useState(false)
  const recentSaves = useSelector((state) => state.home.recentSaves)
  const recentSaveId = recentSaves[0]

  const recentRecs = useSelector((state) => state.recit.recentRecs)
  const recentRecId = useSelector((state) => state.recit.recentRecId)

  const recentRecsIds = Object.keys(recentRecs)

  // Check if we should populate. This is so if we are far down the page we don't
  // get an unexplained jump
  const [ref, inView] = useInView({ threshold: 0.5 })

  useEffect(() => {
    if (inView && !shouldPopulate && recentSaveId) setShouldPopulate(true)
  }, [inView, shouldPopulate, recentSaveId])

  useEffect(() => {
    if (!recentSaveId) return
    if (recentSaveId !== recentRecId) dispatch(recentRecsRequest(recentSaveId))
  }, [recentSaveId, recentRecId, inView, dispatch])

  return recentSaves?.length ? (
    <div ref={ref}>
      {shouldPopulate ? (
        <>
          <HomeSectionHeader
            sectionTitle="Recommended for you"
            sectionDescription="Find more fascinating stories based on your latest Save"
          />
          <Lockup
            items={recentRecsIds}
            offset={0}
            heroPosition="left"
            lockupShape="showcase"
            cardShape="wide"
            ItemCard={RecCard}
          />
        </>
      ) : null}
    </div>
  ) : null
}
