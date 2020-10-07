import { useRef, useState, useEffect } from 'react'
import { getScrollTop, atEndOfScroll } from 'common/utilities'
import { cardsContainer } from 'components/my-list-layouts/cards-container'
import { cardList } from 'components/my-list-layouts/card-list'
import { cardGrid } from 'components/my-list-layouts/card-grid'
import { css, cx } from 'linaria'
import { MemoizedItem } from 'connectors/my-list-items/item-card'

export const ruler = css`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 1px;
  opacity: 0;
  pointer-events: none;
`

/**
 * CardLayout
 * @param {array} items Array of items to split up into sections
 * @param {array} sections Array of section definitions with count and classname
 * @param {object} actions Object of actions specific to the items being built
 */
export function ListLayout({ type, items, actions, loadMore }) {
  /** SETUP
 --------------------------------------------------------------- */
  // Set up ref to ruler so we can get height of the container
  const rulerRef = useRef(null)

  // Set up a ref to hold our timeouts for setting scroll/not-scroll
  const scrollTracker = useRef(null)

  // Set up state to track for virtualization
  const [height, columnCount] = [375, 3]

  const [scrollPosition, setScrollPosition] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const [loading, setLoading] = useState(false)
  const [range, setRange] = useState({ start: -1, end: -1 })
  const [list, setList] = useState({
    listHeight: 0,
    paddingTop: 0,
    itemsToShow: []
  })

  const itemOnScreen = 20 // total items to render minus one

  // Define the section
  const sectionTypes = { list: cardList, grid: cardGrid }
  const containerClasses = cx(cardsContainer, type)

  /** FUNCTIONS
 --------------------------------------------------------------- */
  const checkRange = (event) => {
    // Set up the fact that we are scrolling
    setIsScrolling(true)
    scrollTracker.current = setTimeout(() => {
      setIsScrolling(false)
    }, 500)

    // Get scroll direction.
    const top = getScrollTop()
    const naturalStart = Math.floor(top / height) * columnCount
    const newIndex = Math.max(naturalStart - columnCount * 2, 0)
    setRange({ start: newIndex, end: newIndex + itemOnScreen })

    if (event) setScrollPosition(window.scrollY)
  }

  /** EFFECTS
 --------------------------------------------------------------- */

  // Initial effect run once on load
  useEffect(() => {
    // Handler to call on window resize
    const handleResize = checkRange
    const handleScroll = checkRange

    // Add event listener
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Run when our index values shift
  useEffect(() => {
    const { start, end } = range
    const itemsToShow = items.slice(start, end + 1)
    const paddingTop = (start / columnCount) * height || 0
    const remainder = items.length % 3
    const buffer = remainder ? 3 - remainder : 0
    const listHeight = ((items.length + buffer) / columnCount) * height

    setList({ itemsToShow, paddingTop, listHeight })
  }, [items, range.start, range.end])

  useEffect(() => {
    const listEnd = atEndOfScroll(rulerRef.current.clientHeight * 1.8)

    if (listEnd && !loading) {
      setLoading(true)
      loadMore()
    }
  }, [scrollPosition])

  useEffect(() => {
    setLoading(false)
    checkRange()
  }, [items])

  const { itemsToShow, paddingTop, listHeight } = list
  return (
    // Create a list container with the appropriate classnames
    <div
      className={containerClasses}
      style={{
        position: 'relative',
        pointerEvents: isScrolling ? 'none' : 'auto'
      }}>
      <div
        style={{
          paddingTop,
          height: `${listHeight}px`
        }}>
        <div className={sectionTypes[type]}>
          {itemsToShow.map((id, index) => {
            return (
              <MemoizedItem id={id} key={id} position={index} {...actions} />
            )
          })}
        </div>
      </div>
      <div className={ruler} ref={rulerRef} />
    </div>
  )
}
