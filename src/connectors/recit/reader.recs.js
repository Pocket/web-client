import { css } from 'linaria'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { readerRecsRequested } from './recit.state'
import { Card } from './card'

import { breakpointLargeHandset } from '@pocket/web-ui'


const readerRowStyles = css`
  display: grid;
  align-items: start;
  justify-content: space-between;
  grid-column-gap: var(--spacing150);
  grid-row-gap: var(--spacing150);
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: dense;
  ${breakpointLargeHandset} {
    grid-column-gap: var(--spacing100);
    grid-row-gap: var(--spacing100);
  }

  article {
    grid-column: span 4;
    h2 {
      font-size: var(--fontSize125);
    }
    .details {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`

export const ReaderRecommendations = ({ id }) => {
  const dispatch = useDispatch()

  const recommendations = useSelector((state) => state.recit.readerRecs)

  useEffect(() => {
    dispatch(readerRecsRequested(id))
  }, [dispatch])

  const onSave = (itemId) => {
    console.log('SAVE!!!')
    // dispatch(saveRecommendedItem(itemId))
  }

  const onOpen = () => {
    console.log('OPEN!!')
    // dispatch(sendRecommendedEngagement(itemId))
  }

  const impressionEvent = () => {
    console.log('IMPRESSION!!')
    // dispatch(sendImpressionEvent(itemId))
  }

  return recommendations ? (
    <div className={readerRowStyles}>
      {Object.keys(recommendations).map(itemId => (
        <Card
          key={itemId}
          item={recommendations[itemId]}
          onSave={onSave}
          onOpen={onOpen}
          impressionEvent={impressionEvent}
        />
      ))}
    </div>
  ): null
}
