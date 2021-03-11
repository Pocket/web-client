import { useEffect, useState } from 'react'
import { HomeSectionHeader } from 'components/headers/home-header'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'linaria'
import { RecCard } from 'connectors/item-card/home/cardRec'
import { recentRecsRequest } from 'connectors/recit/recit.state'
import { useInView } from 'react-intersection-observer'

const recGrid = css`
  display: grid;
  align-items: start;
  grid-column-gap: var(--spacing250);
  grid-template-columns: repeat(12, 1fr);
  padding-bottom: 4rem;

  article {
    border-bottom: none;
  }
  //prettier-ignore
  article:nth-child(n+2) {
    grid-column: span 8;
    .media{
      grid-column: span 3;
    }
    .content{
      grid-column: span 9;
    }
    .title{
      font-size: 1rem;
    }
  }
  article:nth-child(4) {
    border-bottom: none;
  }
  article:nth-child(1) {
    grid-row: span 3;
    padding-top: 1rem;
    border-bottom: none;
    .excerpt {
      max-height: 4.4em;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`

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
            sectionTitle="Recommendations"
            sectionDescription="Find new content based on your latest saves"
          />
          <section className={recGrid}>
            {recentSaveId && recentRecsIds.length
              ? recentRecsIds.map((itemId, index) => {
                  const cardShape = index === 0 ? 'block' : 'detail'
                  return (
                    <RecCard
                      cardShape={cardShape}
                      key={`rec-${itemId}`}
                      id={itemId}
                      position={index}
                    />
                  )
                })
              : null}
          </section>
        </>
      ) : null}
    </div>
  ) : null
}
