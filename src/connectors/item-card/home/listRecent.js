import { useEffect } from 'react'
import { HomeSectionHeader } from 'components/headers/home-header'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'linaria'
import { Card as RecCard } from 'connectors/recit/card'
import { cardGrid } from 'components/items-layout/virtualized-list'
import classnames from 'classnames'
import { recentRecsRequest } from 'connectors/recit/recit.state'
import { Skeleton } from 'components/item-card/home/skeleton'

const topicRowStyles = css`
  margin-bottom: 1.5rem;
`

const cardRowStyles = css`
  margin-bottom: var(--spacing100);
  padding-bottom: 2rem;
  border-bottom: var(--dividerStyle);
  article {
    border-bottom: none;
  }
`

export const HomeRecentList = () => {
  const dispatch = useDispatch()

  const recentSaves = useSelector((state) => state.home.recentSaves)
  const recentSaveId = recentSaves[0]

  const recentRecs = useSelector((state) => state.recit.recentRecs)
  const recentRecId = useSelector((state) => state.recit.recentRecId)

  const displayItems = recentSaves?.slice(0, 3)
  const recentIds = Object.keys(recentRecs)

  const onSave = () => {}
  const onOpen = () => {}
  const impressionEvent = () => {}

  useEffect(() => {
    if (!recentSaveId) return
    if (recentSaveId !== recentRecId) dispatch(recentRecsRequest(recentSaveId))
  }, [recentSaveId, recentRecId, dispatch])

  return (
    <div className={topicRowStyles}>
      <HomeSectionHeader
        sectionTitle="Based on your recent saves"
        sectionDescription="Recommendations based on the latest items you've saved"
      />
      <section className={classnames(cardGrid, cardRowStyles)}>
        {recentIds.length ? (
          recentIds.map((itemId, index) => {
            const item = recentRecs[itemId]
            return (
              <RecCard
                key={`rec-${itemId}`}
                item={item}
                position={index}
                onSave={onSave}
                onOpen={onOpen}
                impressionEvent={impressionEvent}
              />
            )
          })
        ) : (
          <Skeleton type="grid" name="recentSkeleton" count={3} />
        )}
      </section>
    </div>
  )
}
