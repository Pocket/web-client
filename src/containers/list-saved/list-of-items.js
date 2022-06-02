import { useEffect, useCallback, useState } from 'react'
import { LoadMore } from './load-more'
import { MemoizedItemCard as ItemCard } from './card'
import { useSelector, useDispatch } from 'react-redux'
import { loadMoreListItems } from './list-saved.state'
import { getScrollTop } from 'common/utilities'
import { useViewport } from 'components/viewport-provider/viewport-provider'

import { css } from 'linaria'

const listSavedStyle = css`
  position: relative;
`

const LIST_DIMENSIONS = {
  list: {
    screenLargeDesktop: ['100%', 75, 1],
    screenMediumDesktop: ['100%', 75, 1],
    screenSmallDesktop: ['100%', 75, 1],
    screenTinyTablet: ['100%', 75, 1],
    screenSmallTablet: ['100%', 75, 1],
    screenMediumTablet: ['100%', 75, 1],
    screenLargeTablet: ['100%', 75, 1],
    screenLargeHandset: ['100%', 75, 1],
    screenMediumHandset: ['100%', 130, 1],
    screenTinyHandset: ['100%', 130, 1],
    screenSmallHandset: ['100%', 130, 1]
  },
  grid: {
    screenLargeDesktop: [295, 361, 3],
    screenMediumDesktop: [295, 361, 3],
    screenSmallDesktop: [295, 361, 3],
    screenLargeTablet: [295, 361, 3],
    screenMediumTablet: [295, 361, 3],
    screenSmallTablet: [295, 326, 3],
    screenTinyTablet: ['100%', 174, 1],
    screenLargeHandset: ['100%', 154, 1],
    screenMediumHandset: ['100%', 154, 1],
    screenSmallHandset: ['100%', 154, 1],
    screenTinyHandset: ['100%', 154, 1]
  },
  detail: {
    screenLargeDesktop: ['100%', 160, 1],
    screenMediumDesktop: ['100%', 160, 1],
    screenSmallDesktop: ['100%', 160, 1],
    screenTinyTablet: ['100%', 185, 1],
    screenSmallTablet: ['100%', 185, 1],
    screenMediumTablet: ['100%', 185, 1],
    screenLargeTablet: ['100%', 185, 1],
    screenLargeHandset: ['100%', 185, 1],
    screenMediumHandset: ['100%', 180, 1],
    screenTinyHandset: ['100%', 185, 1],
    screenSmallHandset: ['100%', 185, 1]
  }
}

export const ListOfItems = () => {
  const dispatch = useDispatch()
  const viewport = useViewport()

  const listSaved = useSelector((state) => state.listSaved)
  const totalCount = useSelector((state) => state.listSavedPageInfo.totalCount)
  const type = useSelector((state) => state.app.listMode)

  const [startingIndex, setStartingIndex] = useState(0)

  // Set up state to track for virtualization
  const breakpoint = getBreakpoint(viewport.width)
  const [width, height, columnCount] = LIST_DIMENSIONS[type][breakpoint]

  const itemsOnScreen = 30
  const verticalPadding = 15
  const horizontalPadding = 25

  const blockRows = listSaved.length / columnCount
  const totalHeight = blockRows * height + blockRows * verticalPadding

  /** FUNCTIONS
 --------------------------------------------------------------- */
  const checkRange = useCallback(() => {
    // Get scroll direction.
    const top = getScrollTop()
    const naturalStart = Math.floor(top / (height + verticalPadding)) * columnCount
    const newIndex = Math.max(naturalStart - columnCount * 2, 0)
    if (startingIndex !== newIndex) setStartingIndex(newIndex)
  }, [columnCount, height, startingIndex])

  /** EFFECTS
 --------------------------------------------------------------- */

  // Initial effect run once on load
  useEffect(() => {
    // Add event listener
    window.addEventListener('resize', checkRange)
    window.addEventListener('scroll', checkRange)

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', checkRange)
      window.removeEventListener('scroll', checkRange)
    }
  }, [checkRange])

  // We don't want to render until we have data
  if (!totalCount) return null

  const loadMore = () => dispatch(loadMoreListItems())
  const itemsToShow = listSaved.slice(startingIndex, startingIndex + itemsOnScreen + 1)

  return (
    <>
      <div className={listSavedStyle}>
        {itemsToShow
          ? itemsToShow.map((itemId) => {
              const positionOfItem = listSaved.indexOf(itemId)
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
                />
              )
            })
          : null}
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
