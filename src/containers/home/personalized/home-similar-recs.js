import { useEffect } from 'react'
import { HomeSimilarHeader } from 'components/headers/home-header'
import { useDispatch, useSelector } from 'react-redux'
import { recentRecsRequest } from 'connectors/recit/recit.state'
import { clearSimilarRecs } from 'containers/home/home.state'
import { RecCard } from 'connectors/item-card/home/card-rec'
import { OffsetList } from 'components/items-layout/list-offset'
import { css } from 'linaria'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'

const similarRecsContainer = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: var(--color-canvas);
  padding: 2.5rem 0;
  border-top: var(--borderStyle);

  &.active {
    transition: transform 200ms 0s ease-out;
    transform: translateY(0);
  }

  &.inactive {
    transition: transform 200ms 0s ease-out;
    transform: translateY(100%);
  }
`

export const HomeSimilarRecs = () => {
  const dispatch = useDispatch()

  const similarRecId = useSelector((state) => state.home.similarRecId)
  const similarRecs = useSelector((state) => state.recit.recentRecs)
  const similarRecIds = similarRecs ? Object.keys(similarRecs) : []
  const closeAction = () => dispatch(clearSimilarRecs())

  const sectionClass = similarRecId && similarRecIds.length ? 'active' : 'inactive'

  useEffect(() => {
    if (!similarRecId) return
    dispatch(recentRecsRequest(similarRecId))
  }, [similarRecId, dispatch])

  return (
    <SectionWrapper className={`${similarRecsContainer} ${sectionClass}`}>
      <HomeSimilarHeader
        closeAction={closeAction}
        sectionTitle="Similar Content"
        sectionDescription="Recommended stories base on your selection"
      />
      {similarRecIds.length ? (
        <OffsetList
          items={similarRecIds}
          offset={0}
          ItemCard={RecCard}
          count={3}
          cardShape="display"
          showMedia={true}
          showExcerpt={false}
          border={false}
          compact={true}
        />
      ) : null}
    </SectionWrapper>
  )
}
