import { useEffect } from 'react'
import { HomeSimilarHeader } from 'components/headers/home-header'
import { useDispatch, useSelector } from 'react-redux'
import { recentRecsRequest } from 'connectors/recit/recit.state'
import { clearSimilarRecs } from './similar.state'
import { RecCard } from 'connectors/item-card/similar/card-rec'
import { OffsetList } from 'components/items-layout/list-offset'
import { css } from 'linaria'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import SimilarSearchSVG from 'static/images/home/similarSearch.svg'
import { breakpointSmallHandset } from '@pocket/web-ui'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

const SimilarSearch = SimilarSearchSVG.src || ''

const similarRecsContainer = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: var(--color-canvas);
  padding: 1.5rem 0;
  border-top: var(--borderStyle);
  z-index: var(--zIndexColorModePicker);

  &.active {
    transition: transform 200ms 0s ease-out;
    transform: translateY(0);
  }

  &.inactive {
    transition: transform 200ms 0s ease-out;
    transform: translateY(100%);
  }
`

const noSimilarRecs = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 1rem;
  align-content: center;
  align-items: center;
  .visuals {
    grid-column: span 3;

    ${breakpointSmallHandset} {
      grid-column: span 12;
      max-height: 5rem;
      margin: 2rem auto 0;
      order: 2;
    }
  }

  .contentBody {
    grid-column: 5 / span 8;

    ${breakpointSmallHandset} {
      grid-column: span 12;
      order: 1;
    }
  }
`

export const SimilarRecs = () => {
  const dispatch = useDispatch()

  const flagsReady = useSelector((state) => state.features.flagsReady)
  const featureState = useSelector((state) => state.features)
  const isLab = flagsReady && featureFlagActive({ flag: 'lab', featureState })

  const similarRecId = useSelector((state) => state.similar.similarRecId)
  const similarRecsResolved = useSelector((state) => state.similar.similarRecsResolved)
  const similarRecs = useSelector((state) => state.recit.recentRecs)
  const similarRecIds = similarRecs ? Object.keys(similarRecs) : []
  const closeAction = () => dispatch(clearSimilarRecs())

  const sectionClass = similarRecsResolved ? 'active' : 'inactive'
  const showSimilar = isLab && similarRecId

  useEffect(() => {
    if (!showSimilar) return
    dispatch(recentRecsRequest(similarRecId))
  }, [similarRecId, dispatch])

  return showSimilar ? (
    <div className={`${similarRecsContainer} ${sectionClass}`} data-cy="similar-recs">
      {similarRecIds.length ? (
        <SectionWrapper>
          <HomeSimilarHeader
            closeAction={closeAction}
            sectionTitle="Similar Stories"
            sectionDescription="Recommended stories base on your recent save"
          />
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
        </SectionWrapper>
      ) : (
        <NoResults closeAction={closeAction} similarRecsResolved={similarRecsResolved} />
      )}
    </div>
  ) : null
}

const NoResults = ({ closeAction, similarRecsResolved }) => {
  return similarRecsResolved ? (
    <SectionWrapper>
      <div className={noSimilarRecs}>
        <img className="visuals" src={SimilarSearch} alt="" />
        <div className="contentBody">
          <HomeSimilarHeader
            closeAction={closeAction}
            sectionTitle="You’re such a trendsetter!"
            sectionDescription="We don’t have any recommendations for this content yet. We will get right on that!"
          />
        </div>
      </div>
    </SectionWrapper>
  ) : (
    <SectionWrapper>Loading...</SectionWrapper>
  )
}
