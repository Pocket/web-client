import { cardsContainer } from 'components/card-layouts/cards-container'
import { cardList } from 'components/card-layouts/card-list'
import { cardLockup } from 'components/card-layouts/card-lockup'
import { ItemCard } from 'connectors/items/item-card'
import { cx } from 'linaria'

/**
 * Article List
 * Returns a list of `TopicArticleCard` with item_id and position
 * @param {object} {items, offset}
 */
export const CardList = function ({ items, offset, children, ...actions }) {
  return (
    <>
      {items.map((id, index) => {
        const position = offset + index + 1 // Analytics requires '1' based position
        const positionZeroIndex = offset + index // required by Snowplow analytics, can be refactored once we no longer need to support legacy analytics for item actions
        return (
          <ItemCard
            id={id}
            key={id}
            position={position}
            positionZeroIndex={positionZeroIndex}
            {...actions}
          />
        )
      })}
      {children}
    </>
  )
}

/**
 * CardLayout
 * @param {array} items Array of items to split up into sections
 * @param {array} sections Array of section definitions with count and classname
 * @param {object} actions Object of actions specific to the items being built
 */
export function CardLayout({ children, initialOffset = 0, ...actions }) {
  const sectionTypes = {
    list: cardList,
    lockupLeft: `${cardLockup} lockup heroLeft`,
    lockupCenter: `${cardLockup} lockup heroCenter`,
    lockupRight: `${cardLockup} lockup heroRight`
  }

  const validTypes = Object.keys(sectionTypes)

  // This establishes the initial offset
  let offset = initialOffset

  // If a single child is returned make it an array
  const sections = Array.isArray(children) ? children : [children]

  // Go through each section and build a container as defined
  return sections.map((section) => {
    const { type, items, count, classNames = [] } = section.props

    // Render non-typed components as is
    if (!validTypes.includes(type)) return section

    // Get subsection of items based on count and offset
    const sliceTo = count ? offset + count : items?.length
    const sectionItems = items?.slice(offset, sliceTo)

    // Check that we have data for the section
    if (!sectionItems.length) return null

    // Define the section
    const containerClasses = cx(cardsContainer, type, ...classNames)
    const Section = (
      // Create a list container with the appropriate classnames
      <div key={`${type}-${offset}`} className={containerClasses}>
        {/* Inner container  is this necessary?*/}
        <div className={sectionTypes[type]}>
          {/* Clone the child and add offset, sectionItems, and actions */}
          {React.cloneElement(section, {
            offset,
            items: sectionItems,
            ...actions
          })}
        </div>
      </div>
    )
    offset += count
    return Section
  })
}
