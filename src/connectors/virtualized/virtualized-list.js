import { useRef, useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getScrollTop } from 'common/utilities'
import { cardsContainer } from 'components/items-layout/base'
import { cx } from 'linaria'
import { MemoizedItem } from 'connectors/item-card/saves/card'
import { cardDetail } from 'components/items-layout/virtualized-list'
import { cardList } from 'components/items-layout/virtualized-list'
import { cardGrid } from 'components/items-layout/virtualized-list'
import { ruler } from 'components/items-layout/virtualized-list'
import { useViewport } from 'components/viewport-provider/viewport-provider'
import { LoadMore } from 'connectors/virtualized/load-more'
/**
 * CardLayout
 * @param {array} items Array of items to split up into sections
 * @param {array} sections Array of section definitions with count and classname
 * @param {object} actions Object of actions specific to the items being built
 */
export function VirtualizedList({ type = 'grid', section, actions, loadMore = () => {} }) {
  /** SETUP
 --------------------------------------------------------------- */
  const viewport = useViewport()
  const items = useSelector((state) => state.saves[section])
  const total = useSelector((state) => state.saves[`${section}Total`])
  const count = items.length

  // Set up ref to ruler so we can get height of the container
  const rulerRef = useRef(null)

  // Set up a ref to hold our timeouts for setting scroll/not-scroll
  const scrollTracker = useRef(null)

  // Set up state to track for virtualization
  const breakpoint = getBreakpoint(viewport.width)
  const dimensions = {
    list: {
      screenLargeDesktop: [75, 1],
      screenMediumDesktop: [75, 1],
      screenSmallDesktop: [75, 1],
      screenTinyTablet: [75, 1],
      screenSmallTablet: [75, 1],
      screenMediumTablet: [75, 1],
      screenLargeTablet: [75, 1],
      screenLargeHandset: [75, 1],
      screenMediumHandset: [130, 1],
      screenTinyHandset: [130, 1],
      screenSmallHandset: [130, 1]
    },
    grid: {
      screenLargeDesktop: [361, 3],
      screenMediumDesktop: [361, 3],
      screenSmallDesktop: [361, 3],
      screenLargeTablet: [361, 3],
      screenMediumTablet: [361, 3],
      screenSmallTablet: [326, 3],
      screenTinyTablet: [174, 1],
      screenLargeHandset: [154, 1],
      screenMediumHandset: [154, 1],
      screenSmallHandset: [154, 1],
      screenTinyHandset: [154, 1]
    },
    detail: {
      screenLargeDesktop: [160, 1],
      screenMediumDesktop: [160, 1],
      screenSmallDesktop: [160, 1],
      screenTinyTablet: [185, 1],
      screenSmallTablet: [185, 1],
      screenMediumTablet: [185, 1],
      screenLargeTablet: [185, 1],
      screenLargeHandset: [185, 1],
      screenMediumHandset: [180, 1],
      screenTinyHandset: [185, 1],
      screenSmallHandset: [185, 1]
    }
  }
  const [height, columnCount] = dimensions[type][breakpoint]

  const itemOnScreen = type === 'list' ? 25 : 20 // total items to render minus one

  const [hasScrolled, setHasScrolled] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [range, setRange] = useState({ start: -1, end: -1 })
  const [list, setList] = useState({
    listHeight: 0,
    paddingTop: 0,
    itemsToShow: []
  })

  // Define the section
  const sectionTypes = { list: cardList, grid: cardGrid, detail: cardDetail }
  const containerClasses = cx(cardsContainer, type)

  const { itemsToShow, paddingTop, listHeight } = list

  /** FUNCTIONS
 --------------------------------------------------------------- */
  const checkRange = useCallback(() => {
    // Set up the fact that we are scrolling
    setIsScrolling(true)
    scrollTracker.current = setTimeout(() => setIsScrolling(false), 500)

    // Get scroll direction.
    const top = getScrollTop()
    const naturalStart = Math.floor(top / height) * columnCount
    const newIndex = Math.max(naturalStart - columnCount * 2, 0)
    setRange({ start: newIndex, end: newIndex + itemOnScreen })
  }, [columnCount, height, itemOnScreen])

  /** EFFECTS
 --------------------------------------------------------------- */

  // Initial effect run once on load
  useEffect(() => {
    const handleScroll = (event) => {
      if (!hasScrolled) return setHasScrolled(true)
      checkRange(event)
    }

    const handleResize = (event) => {
      checkRange(event)
    }

    // Add event listener
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [height, columnCount, itemOnScreen, hasScrolled, checkRange])

  // Run when our index values shift
  useEffect(() => {
    const { start, end } = range
    const itemsToShow = items.slice(start, end + 1)
    const paddingTop = (start / columnCount) * height || 0
    const remainder = items.length % 3
    const buffer = remainder ? 3 - remainder : 0
    const listHeight = ((items.length + buffer) / columnCount) * height

    setList({ itemsToShow, paddingTop, listHeight })
  }, [items, range, height, columnCount])

  useEffect(() => {
    checkRange()
  }, [items, checkRange])

  useEffect(() => {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }, [type])

  return (
    // Create a list container with the appropriate classname
    <div
      className={containerClasses}
      style={{
        position: 'relative',
        pointerEvents: isScrolling ? 'none' : 'auto'
      }}>
      <div
        style={{
          height: `${listHeight}px`,
          paddingTop
        }}>
        <div className={sectionTypes[type]}>
          {itemsToShow.map((id) => {
            const positionOfItem = items.indexOf(id)
            return (
              <MemoizedItem id={id} key={id} position={positionOfItem} type={type} {...actions} />
            )
          })}
        </div>
      </div>
      <LoadMore count={count} total={total} loadMore={loadMore} />
      <div className={ruler} ref={rulerRef} />
    </div>
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
