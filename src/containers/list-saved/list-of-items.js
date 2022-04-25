import { useEffect, useCallback, useState } from 'react'
import { LoadMore } from './load-more'
import { MemoizedItemCard as ItemCard } from './card'
import { useSelector, useDispatch } from 'react-redux'
import { loadMoreListItems } from './list-saved.state'
import { getScrollTop } from 'common/utilities'

import { css } from 'linaria'

const listSavedStyle = css`
  position: relative;
`

export const ListOfItems = () => {
  const dispatch = useDispatch()

  const listSaved = useSelector((state) => state.listSaved)
  const totalCount = useSelector((state) => state.listSavedPageInfo.totalCount)

  const [startingIndex, setStartingIndex] = useState(0)

  const itemsOnScreen = 30
  const columnCount = 3
  const width = 295
  const height = 350
  const verticalPadding = 15
  const horizontalPadding = 25
  const totalColumns = 3

  const blockRows = listSaved.length / totalColumns
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
