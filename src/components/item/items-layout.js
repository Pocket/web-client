import { css } from 'linaria'
import { breakpointLargeTablet } from 'common/constants'
import { breakpointSmallDesktop } from 'common/constants'
import { breakpointMediumTablet } from 'common/constants'
import { breakpointSmallTablet } from 'common/constants'
import { breakpointTinyTablet } from 'common/constants'
import { breakpointLargeHandset } from 'common/constants'
import { breakpointMediumHandset } from 'common/constants'
import { containerMaxWidth } from 'common/constants'

/**
 * Shared styles
 * These are sort of baseline styles so we don't have a bunch of duplication.
 * Linaria does not yet support fragments (issue open since 2019 so ... https://github.com/callstack/linaria/issues/244)
 * So we do composition sparingly (no syntax highlighting or linting)
 */
const gridFragment = `
  display: grid;
  align-items: flex-start;
  justify-content: space-between;
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: row dense;
`

const horizontalFragment = `
  grid-template-rows: minmax(0, 1fr) 46px;
  grid-template-columns: 200px minmax(0, 1fr);
  --media-radius: 0.5rem;
  --title-margin: 0.5rem 0;
  --excerpt-display: block;
  .media-block {
    grid-row: span 2;
    margin: 0.5rem;
  }
  .details {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
  .footer {
    grid-template-columns: 1fr;
  }
`

/**
 * Standard Grid
 * ---------------------------------------------------
 * This is a straightforward 12 panel grid that spans the full width
 * of the container
 */
export const standardGrid = css`
  ${gridFragment}
  padding: 1.5rem 0 0;
  article {
    grid-column: span 4;
  }

  ${breakpointMediumTablet} {
    article {
      grid-column: span 6;
    }
  }

  ${breakpointLargeHandset} {
    article {
      grid-column: span 12;
    }
  }
`

/**
 * Basic Slide
 * ---------------------------------------------------
 * This is a really simple slider that makes a 4 across card block
 * that goes into a 2 across at small sizes
 */
export const basicSlide = css`
  padding: 0;
  .outer-slide {
    display: block;
    margin: 0 auto;
    max-width: calc(${containerMaxWidth}px + 4rem);
    overflow: hidden;
    padding: 0 2rem;
    position: relative;
    &:after,
    &:before {
      content: '';
      display: block;
      position: absolute;
      width: 2rem;
      height: 100%;
      bottom: 0;
      top: 0;
      z-index: var(--zIndexRaised);
    }
    &:after {
      right: 0;
      background: linear-gradient(90deg, transparent 25%, var(--color-canvas));
    }
    &:before {
      left: 0;
      background: linear-gradient(90deg, var(--color-canvas), transparent 25%);
    }
  }

  .inner-slide {
    ${gridFragment}
    padding: 1.5rem 0;
    width: 200%;
    grid-template-columns: repeat(24, 1fr);
    transition: 350ms ease-in-out;
  }

  article {
    grid-column: span 3;
  }

  ${breakpointLargeTablet} {
    // Two cards across
    article {
      grid-column: span 4;
    }
  }

  ${breakpointTinyTablet} {
    // Two cards across
    article {
      grid-column: span 6;
    }
  }

  ${breakpointLargeHandset} {
    article {
      grid-column: span 12;
    }
  }
`

/**
 * Hero Group
 * ---------------------------------------------------
 * This is a layout of 5 cards where the first card is in a hero position
 * flanked by 4 sub cards.
 * ┌───────┐ ┌───┐┌───┐
 * │       │ └───┘└───┘
 * │       │ ┌───┐┌───┐
 * └───────┘ └───┘└───┘
 */
export const heroGrid = css`
  display: grid;
  align-items: flex-start;
  justify-content: space-between;
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: row dense;
  padding: 1.5rem 0 2.5rem;

  article {
    grid-column: span 3;
    grid-template-rows: auto minmax(0, 1fr);
    --excerpt-display: none;

    ${breakpointSmallTablet} {
      grid-column: span 6;
    }
  }

  article:first-of-type {
    /* card shape */
    grid-column: 1 / span 6;
    grid-row: span 2;

    /* card styling */
    --title-size: 1.5rem;
    --excerpt-display: block;
    --excerpt-size: 1rem;

    ${breakpointSmallTablet} {
      grid-column: 1 / span 12;
      grid-row: span 1;
    }
  }
`

/**
 * Stacked Group
 * ---------------------------------------------------
 * This is a layout of stacked cards that have room for an optional asside
 * ┌───────┐
 * └───────┘
 * ┌───────┐
 * └───────┘
 * ┌───────┐
 * └───────┘
 */
export const stackedGrid = css`
  display: grid;
  align-items: flex-start;
  justify-content: space-between;
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: row dense;
  padding: 1.5rem 0 3.5rem;

  &.full article {
    grid-column: span 12;
    --excerpt-display: block;
  }

  article {
    --media-radius: 1rem;
    grid-column: span 8;
    width: 100%;
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-columns: auto minmax(0, 1fr);
    margin-bottom: 0;

    .media-block {
      margin: 0.5rem;
      width: 280px;
      grid-row: span 2;
    }

    ${breakpointLargeTablet} {
      grid-column: span 12;
      .excerpt {
        display: block;
      }
    }
    ${breakpointTinyTablet} {
      .media-block {
        margin: 0.5rem;
        width: 140px;
        grid-row: span 2;
      }
    }
  }
`

export const stackedGridNoAside = css`
  padding: 1rem 0;

  article {
    grid-column: span 12;
  }
`

/**
 * Recent Saves
 * These are small cards with no action to take (other than link actions)
 *
 */

export const recentGrid = css`
  display: grid;
  align-items: flex-start;
  justify-content: space-between;
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: row dense;
  padding: 1.5rem 0 0;

  article {
    grid-column: span 4;
    --media-radius: 0.5rem;
    --title-size: 0.825rem;
    --title-margin: 0.5rem 0;
    --excerpt-display: none;

    --card-padding: 0.5rem;

    .media-block {
      margin: 0.5rem 0 0.5rem 0.5rem;
      grid-row: span 2;
    }

    grid-column-gap: 0.5rem;
    grid-template-rows: minmax(0, 1fr) 32px;
    grid-template-columns: 156px minmax(0, 1fr);

    .details {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }
    .footer {
      grid-template-columns: 1fr;
    }
    .footer-actions {
      display: none;
    }
    .context {
      display: none;
    }

    ${breakpointMediumTablet} {
      grid-template-columns: 100px minmax(0, 1fr);
      grid-column: span 6;
      &:nth-child(n + 3) {
        display: none;
      }
    }

    ${breakpointLargeHandset} {
      grid-column: span 12;
      &:nth-child(n + 2) {
        display: none;
      }
    }
  }
`
