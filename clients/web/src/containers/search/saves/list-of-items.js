import { useEffect, useCallback, useState } from 'react'
import { LoadMore } from './load-more'
import { ItemCard } from 'connectors/items/item-card-saved'
import { useSelector, useDispatch } from 'react-redux'
import { getScrollTop } from 'common/utilities/scroll/scroll'
import { useViewport } from 'components/viewport-provider/viewport-provider'
import { EmptyFilters } from 'components/empty-states/filters'
import { loadMoreListItems } from '../../saves/saved-items/saved-items.state'
import { loadPreviousListItems } from '../../saves/saved-items/saved-items.state'

import { css } from '@emotion/css'

const itemsListStyle = css`
  position: relative;
  margin-top: 2rem;
`

const cardHeight = 400

export const LIST_DIMENSIONS = {
  grid: {
    screenLargeDesktop: [0.3, cardHeight, 3],
    screenMediumDesktop: [0.3, cardHeight, 3],
    screenSmallDesktop: [0.3, cardHeight, 3],
    screenLargeTablet: [0.3, cardHeight, 3],
    screenMediumTablet: [0.3, cardHeight, 3],
    screenSmallTablet: [0.3, cardHeight, 3],
    screenTinyTablet: [0.3, cardHeight, 3],
    screenLargeHandset: ['100%', cardHeight, 1],
    screenMediumHandset: ['100%', cardHeight, 1],
    screenSmallHandset: ['100%', cardHeight, 1],
    screenTinyHandset: ['100%', cardHeight, 1]
  }
}

export const ListOfSavedItems = () => {
  const dispatch = useDispatch()
  const viewport = useViewport()

  const pageSearchIds = useSelector((state) => state.pageSavedIds)
  const type = 'grid'
  const loading = useSelector((state) => state.pageSavedInfo.loading)

  const [startingIndex, setStartingIndex] = useState(0)

  // Set up state to track for virtualization
  const breakpoint = getBreakpoint(viewport.width)
  const [widthPercentage, height, columnCount] = LIST_DIMENSIONS[type][breakpoint] //width
  const width = typeof widthPercentage === 'string' ? widthPercentage : Math.min(Math.ceil(viewport.width*widthPercentage), 355) //prettier-ignore

  const itemsOnScreen = 30
  const verticalPadding = 25
  const horizontalPadding = 25

  const blockRows = Math.ceil(pageSearchIds.length / columnCount)
  const totalHeight = blockRows * height + blockRows * verticalPadding

  /** FUNCTIONS
 --------------------------------------------------------------- */
  const checkRange = useCallback(() => {
    // Get scroll direction.
    const top = getScrollTop()
    const naturalStart = Math.floor(top / (height + verticalPadding)) * columnCount
    const newIndex = Math.max(naturalStart - columnCount * 2, 0)
    if (startingIndex !== newIndex) setStartingIndex(newIndex)
  }, [columnCount, height, startingIndex, verticalPadding])

  const checkVisibility = useCallback(() => {
    if (document.visibilityState === 'visible') dispatch(loadPreviousListItems())
  }, [dispatch])

  /** EFFECTS
 --------------------------------------------------------------- */

  // Initial effect run once on load
  useEffect(() => {
    // Add event listener
    window.addEventListener('resize', checkRange)
    window.addEventListener('scroll', checkRange)
    window.addEventListener('visibilitychange', checkVisibility)

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', checkRange)
      window.removeEventListener('scroll', checkRange)
      window.removeEventListener('visibilitychange', checkVisibility)
    }
  }, [checkRange, checkVisibility])

  const loadMore = () => dispatch(loadMoreListItems())
  const itemsToShow = pageSearchIds.slice(startingIndex, startingIndex + itemsOnScreen + 1)

  return (
    <>
      <div className={itemsListStyle}>
        {itemsToShow
          ? itemsToShow.map((itemId) => {
              const positionOfItem = pageSearchIds.indexOf(itemId)
              return (
                <ItemCard
                  key={itemId}
                  id={itemId}
                  position={positionOfItem}
                  type={type}
                  clamp={true}
                  columnCount={columnCount}
                  width={width}
                  height={height}
                  verticalPadding={verticalPadding}
                  horizontalPadding={horizontalPadding}
                  snowplowId="search.saves"
                />
              )
            })
          : null}
        {!loading && pageSearchIds.length === 0 ? <EmptyFilters subset="search" /> : null}
        <div style={{ height: totalHeight, width: 1, visibility: 'hidden' }}></div>
      </div>
      <LoadMore loadMore={loadMore} />
    </>
  )
}

// !! We can do better
// Currently viewport provider just polls screen resizes
// We can listen for breakpoint changes instead so there is less churn of these
// values. But we can do that when the virtualization switches to absolute
function getBreakpoint(width) {
  if (width <= 359) return 'screenTinyHandset'
  if (width <= 399) return 'screenSmallHandset'
  if (width <= 479) return 'screenMediumHandset'
  if (width <= 599) return 'screenLargeHandset'
  if (width <= 719) return 'screenTinyTablet'
  if (width <= 839) return 'screenSmallTablet'
  if (width <= 959) return 'screenMediumTablet'
  if (width <= 1023) return 'screenLargeTablet'
  if (width <= 1279) return 'screenSmallDesktop'
  if (width <= 1439) return 'screenMediumDesktop'
  return 'screenLargeDesktop'
}
