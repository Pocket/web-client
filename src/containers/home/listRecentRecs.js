import { useEffect, useState } from 'react'
import { HomeSectionHeader } from 'components/headers/home-header'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'linaria'
import { RecCard } from 'connectors/item-card/home/cardRec'
import { recentRecsRequest } from 'connectors/recit/recit.state'
import { useInView } from 'react-intersection-observer'
import { CardSkeleton } from 'components/item-card/card-skeleton'
import { breakpointLargeHandset } from '@pocket/web-ui'

const recGrid = css`
  display: grid;
  align-items: start;
  grid-column-gap: var(--spacing150);
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
  }

  article:nth-child(1) {
    grid-row: span 3;
    padding-top: 1rem;
    border-bottom: none;
    min-height: 473px;
    .excerpt {
      max-height: 4.4em;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  ${breakpointLargeHandset} {
    article:nth-child(n + 2),
    article:nth-child(1) {
      grid-column: span 12;
      grid-row: span 1;

      .media {
        grid-column: span 4;
      }
      .content {
        grid-column: span 8;
      }
    }
    article:nth-child(1) {
      .actions {
        justify-content: flex-end;
      }
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
            sectionTitle="Recommended for you"
            sectionDescription="Find more fascinating stories based on your latest Save"
          />
          <section className={recGrid}>
            {recentSaveId && recentRecsIds.length ? (
              recentRecsIds.map((itemId, index) => {
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
            ) : (
              <CardSkeleton
                count={4}
                cardShape={['block', 'wide', 'wide', 'wide']}
              />
            )}
          </section>
        </>
      ) : null}
    </div>
  ) : null
}
