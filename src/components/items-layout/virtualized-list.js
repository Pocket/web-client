import { useRef, useState, useEffect, useCallback } from 'react'
import { getScrollTop, atEndOfScroll } from 'common/utilities'
import { cardsContainer } from './base'
import { cardsGrid } from './base'
import { css, cx } from 'linaria'
import { MemoizedItem } from 'connectors/item-card/my-list/card'

export const ruler = css`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 1px;
  opacity: 0;
  pointer-events: none;
`

export const cardGrid = css`
  ${cardsGrid};
  grid-row-gap: var(--size200);
  article {
    height: 335px;
    grid-column: span 4;
    & > a {
      padding-bottom: var(--size150);
    }
    h2 {
      font-size: var(--fontSize100);
    }
    .details {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .excerpt {
      display: none;
    }
    .item-actions {
      width: 100%;
    }
    .actions {
      opacity: 0;
    }

    &:hover .actions {
      opacity: 1;
    }
    .footer {
      position: absolute;
      bottom: -12px;
      left: 50%;
      width: 100%;
      transform: translateX(-50%);
      z-index: var(--zIndexRaised);
    }
    .bulkBacking {
      padding: 1.1em;
    }
  }
`

export const cardList = css`
  ${cardsGrid};
  grid-row-gap: 0;

  article {
    grid-column: span 12;
    height: 75px;
    padding: 1em 0;
    border-bottom: 1px solid var(--color-dividerTertiary);

    & > a {
      display: grid;
      grid-column: span 11;
      grid-template-columns: repeat(12, 1fr);
      grid-column-gap: var(--size150);
      padding: 0;
    }
    .media {
      overflow: hidden;
      width: initial;
      height: 0;
      padding-top: 66.66%;
      grid-column: span 1;
    }

    .content {
      grid-column: span 11;
      position: relative;
    }

    .title {
      padding: 0;
      font-size: var(--fontSize100);
      line-height: 1.286;
      width: 70%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .details {
      font-size: var(--fontSize075);
      line-height: 1.5;
      padding: var(--size025) 0 0;
    }

    .excerpt {
      font-size: var(--fontSize100);
      display: none;
    }

    .item-actions {
      padding: 0;
      &:after {
        box-shadow: none;
      }
    }

    .footer {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
    .bulkBacking {
      padding: 0.125em 1.1em;
    }
    .actions {
      grid-column: 4 / span 5;
    }
  }
`

/**
 * CardLayout
 * @param {array} items Array of items to split up into sections
 * @param {array} sections Array of section definitions with count and classname
 * @param {object} actions Object of actions specific to the items being built
 */
export function VirtualizedList({ type, items, actions, loadMore = () => {} }) {
  /** SETUP
 --------------------------------------------------------------- */
  // Set up ref to ruler so we can get height of the container
  const rulerRef = useRef(null)

  // Set up a ref to hold our timeouts for setting scroll/not-scroll
  const scrollTracker = useRef(null)

  // Set up state to track for virtualization
  const [height, columnCount] = type === 'list' ? [75, 1] : [367, 3] //row-gap = 24
  const itemOnScreen = type === 'list' ? 25 : 20 // total items to render minus one

  const [hasScrolled, setHasScrolled] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const [loading, setLoading] = useState(false)
  const [range, setRange] = useState({ start: -1, end: -1 })
  const [list, setList] = useState({
    listHeight: 0,
    paddingTop: 0,
    itemsToShow: []
  })

  // Define the section
  const sectionTypes = { list: cardList, grid: cardGrid }
  const containerClasses = cx(cardsContainer, type)

  const { itemsToShow, paddingTop, listHeight } = list

  const hasItems = itemsToShow.length > 0

  /** FUNCTIONS
 --------------------------------------------------------------- */
  const checkRange = useCallback(
    (event) => {
      // Set up the fact that we are scrolling
      setIsScrolling(true)
      scrollTracker.current = setTimeout(() => setIsScrolling(false), 500)

      // Get scroll direction.
      const top = getScrollTop()
      const naturalStart = Math.floor(top / height) * columnCount
      const newIndex = Math.max(naturalStart - columnCount * 2, 0)
      setRange({ start: newIndex, end: newIndex + itemOnScreen })

      if (event) setScrollPosition(window.scrollY)
    },
    [columnCount, height, itemOnScreen]
  )

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
    // Don't run this when there are no items yet.  Avoid doubling up.
    if (!hasItems || loading) return

    const buffer = height * 2
    const listEnd = atEndOfScroll(buffer)

    if (listEnd && !loading) {
      setLoading(true)
      loadMore()
    }
  }, [scrollPosition, loading, height, hasItems])

  useEffect(() => {
    setLoading(false)
    checkRange()
  }, [items, checkRange])

  useEffect(() => {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }, [type])

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
          height: `${listHeight}px`
        }}>
        <div style={{ paddingTop }} />
        <div className={sectionTypes[type]}>
          {itemsToShow.map((id) => {
            const positionOfItem = items.indexOf(id)
            return (
              <MemoizedItem
                id={id}
                key={id}
                position={positionOfItem}
                type={type}
                {...actions}
              />
            )
          })}
        </div>
      </div>
      <div className={ruler} ref={rulerRef} />
    </div>
  )
}
