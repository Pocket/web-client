import { useEffect, useCallback, useState } from 'react'
import { LoadMore } from './load-more'
import { MemoizedItemCard as ItemCard } from 'connectors/items/item-card-saved'
import { useSelector, useDispatch } from 'react-redux'
import { loadMoreListItems } from './saved-items.state'
import { loadPreviousListItems } from './saved-items.state'
import { getScrollTop } from 'common/utilities/scroll/scroll'
import { useViewport } from 'components/viewport-provider/viewport-provider'
import { EmptyFilters } from 'components/empty-states/filters'

import { css } from '@emotion/css'

const itemsListStyle = css`
  position: relative;
  margin-top: 2rem;
`

const LIST_DIMENSIONS = {
  list: {
    screenLargeDesktop: ['100%', 72, 1],
    screenMediumDesktop: ['100%', 72, 1],
    screenSmallDesktop: ['100%', 72, 1],
    screenLargeTablet: ['100%', 72, 1],
    screenSmallTablet: ['100%', 72, 1],
    screenMediumTablet: ['100%', 72, 1],
    screenTinyTablet: ['100%', 72, 1],
    screenLargeHandset: ['100%', 72, 1],
    screenMediumHandset: ['100%', 130, 1],
    screenSmallHandset: ['100%', 130, 1],
    screenTinyHandset: ['100%', 130, 1]
  },
  grid: {
    screenLargeDesktop: [0.24, 300, 3],
    screenMediumDesktop: [0.24, 300, 3],
    screenSmallDesktop: [0.24, 300, 3],
    screenLargeTablet: [0.28, 300, 3],
    screenMediumTablet: [0.28, 300, 3],
    screenSmallTablet: [0.28, 300, 3],
    screenTinyTablet: [0.4, 300, 2],
    screenLargeHandset: ['100%', 174, 1],
    screenMediumHandset: ['100%', 174, 1],
    screenSmallHandset: ['100%', 174, 1],
    screenTinyHandset: ['100%', 174, 1]
  },
  detail: {
    screenLargeDesktop: ['100%', 174, 1],
    screenMediumDesktop: ['100%', 174, 1],
    screenSmallDesktop: ['100%', 174, 1],
    screenSmallerDesktop: ['100%', 174, 1],
    screenTinyTablet: ['100%', 174, 1],
    screenLargeTablet: ['100%', 174, 1],
    screenMediumTablet: ['100%', 174, 1],
    screenSmallTablet: ['100%', 174, 1],
    screenLargeHandset: ['100%', 174, 1],
    screenMediumHandset: ['100%', 180, 1],
    screenSmallHandset: ['100%', 174, 1],
    screenTinyHandset: ['100%', 174, 1]
  }
}

export const ListOfItems = ({ subset }) => {
  const dispatch = useDispatch()
  const viewport = useViewport()

  const pageSavedIds = useSelector((state) => state.pageSavedIds)
  const type = useSelector((state) => state.app.listMode)
  const loading = useSelector((state) => state.pageSavedInfo.loading)

  const [startingIndex, setStartingIndex] = useState(0)

  // Set up state to track for virtualization
  const breakpoint = getBreakpoint(viewport.width)
  const [widthPercentage, height, columnCount] = LIST_DIMENSIONS[type][breakpoint] //width
  const width = typeof widthPercentage === 'string' ? widthPercentage : Math.min(Math.ceil(viewport.width*widthPercentage), 295) //prettier-ignore

  const itemsOnScreen = 30
  const verticalPadding = type === 'list' ? 10 : 25
  const horizontalPadding = 25

  const blockRows = pageSavedIds.length / columnCount
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
  const itemsToShow = pageSavedIds.slice(startingIndex, startingIndex + itemsOnScreen + 1)

  return (
    <>
      <div className={itemsListStyle} data-testid={`list-of-items-view-${type}`}>
        {itemsToShow
          ? itemsToShow.map((itemId) => {
              const positionOfItem = pageSavedIds.indexOf(itemId)
              return (
                <ItemCard
                  key={itemId}
                  id={itemId}
                  position={positionOfItem}
                  type={type}
                  columnCount={columnCount}
                  width={width}
                  height={height}
                  verticalPadding={verticalPadding}
                  horizontalPadding={horizontalPadding}
                  snowplowId="saves"
                />
              )
            })
          : null}
        {!loading && pageSavedIds.length === 0 ? <EmptyFilters subset={subset} /> : null}
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
