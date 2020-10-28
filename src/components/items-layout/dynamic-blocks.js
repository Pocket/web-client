import { cloneElement } from 'react'
import { ItemCard as DiscoverCard } from 'connectors/item-card/discover/card'
import { ItemCard as MyListCard } from 'connectors/item-card/my-list/card'
import { breakpointTinyTablet } from '@pocket/web-ui'
import { breakpointSmallHandset } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { breakpointMediumTablet } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'

import { css, cx } from 'linaria'
import { cardsGrid } from './base'
import { cardsContainer } from './base'
import { cardLockup } from './lockup-blocks'

export const cardGrid = css`
  ${cardsGrid};
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
    .excerpt {
      display: none;
    }
  }
`

/**
 * Article cards represented in a wide-box list format.
 */
export const cardList = css`
  ${cardsGrid};

  article {
    grid-column: span 8;
    & > a {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-column-gap: var(--size150);
      padding: 0;
    }
    .media {
      overflow: hidden;
      width: initial;
      height: 0;
      padding-top: 66.66%;
      grid-column: span 3;
      margin-bottom: var(--size150);
    }

    .content {
      grid-column: span 5;
      position: relative;
      padding-bottom: 3.5rem;
    }

    .title {
      padding: 0;
      font-size: var(--fontSize150);
      line-height: 1.286;
    }

    .details {
      font-size: var(--fontSize100);
      line-height: 1.5;
    }

    .excerpt {
      font-size: var(--fontSize100);
      display: block;
    }

    .footer {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-column-gap: var(--size150);
    }

    .actions {
      grid-column: 4 / span 5;
    }

    ${breakpointLargeTablet} {
      grid-column: span 9;
      .details {
        font-size: var(--fontSize085);
      }
      .excerpt {
        font-size: var(--fontSize085);
      }
    }

    ${breakpointMediumTablet} {
      grid-column: span 10;
    }

    ${breakpointTinyTablet} {
      grid-column: span 12;
      .title {
        font-size: var(--fontSize125);
      }
    }

    ${breakpointLargeHandset} {
      height: auto;

      .title {
        font-size: var(--fontSize100);
        line-height: 1.25;
      }
      .details {
        font-size: var(--fontSize085);
      }
      .excerpt {
        display: none;
      }
      .media {
        grid-column: 7 / span 5;
        grid-row: 1 / span 2;
        margin-bottom: 0;
      }
      .footer {
        display: block;
        position: relative;
        padding-bottom: var(--spacing100);
      }
      .content {
        padding-bottom: 0;
      }
    }

    ${breakpointSmallHandset} {
      .content {
        grid-column: span 6;
      }
    }
  }
`

/**
 * Article List
 * Returns a list of `TopicArticleCard` with item_id and position
 * @param {object} {items, offset}
 */
export const CardList = function ({
  items,
  itemType,
  offset,
  children,
  ...actions
}) {
  const Card = itemType === 'my-list' ? MyListCard : DiscoverCard
  return (
    <>
      {items.map((id, index) => {
        const position = offset + index + 1 // Analytics requires '1' based position
        const positionZeroIndex = offset + index // required by Snowplow analytics, can be refactored once we no longer need to support legacy analytics for item actions
        return (
          <Card
            id={id}
            key={id}
            fluidHeight={true}
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
export function DynamicCardLayout({ children, initialOffset = 0, ...actions }) {
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
          {cloneElement(section, {
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
