import { css } from 'linaria'
import { breakpointLargeTablet, breakpointSmallDesktop } from 'common/constants'
import { breakpointMediumTablet } from 'common/constants'
import { breakpointSmallTablet } from 'common/constants'
import { breakpointTinyTablet } from 'common/constants'
import { breakpointLargeHandset } from 'common/constants'
import { breakpointMediumHandset } from 'common/constants'

/**
 * Standard Grid
 * ---------------------------------------------------
 * This is a straightforward 12 panel grid that spans the full width
 * of the container
 */
export const standardGrid = css`
  display: grid;
  align-items: flex-start;
  justify-content: space-between;
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: row dense;
  padding: 1.5rem 0 0;

  ${breakpointMediumTablet} {
    // Two cards across
    article {
      grid-column: span 12;
      --media-radius: 0.5rem;
      --title-size: 1rem;
      --title-margin: 0.5rem 0;
      --excerpt-display: block;

      grid-column-gap: 0.5rem;
      grid-template-rows: minmax(0, 1fr) 46px;
      grid-template-columns: 200px minmax(0, 1fr);

      .media-block {
        margin: 0.5rem;
        width: 100%;
        grid-row: span 2;
      }

      .details {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
      }
      .footer {
        grid-template-columns: 1fr;
      }
    }

    ${breakpointLargeHandset} {
      article {
        grid-template-columns: 100px minmax(0, 1fr);
      }
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
  padding: 1.5rem 0 0;
  .inner-slide {
    display: grid;
    align-items: flex-start;
    justify-content: space-between;
    grid-column-gap: 1.5rem;
    grid-row-gap: 1.5rem;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-flow: row dense;
  }

  article {
    grid-column: span 3;
  }

  .controls {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
    button {
      font-size: 1.25rem;
      border: var(--borderStyle);
      border-radius: 50%;
      margin-left: 1rem;
      padding: 0.5rem;
    }
  }

  &.no-slide .controls {
    display: none;
  }

  .outer-slide {
    width: 100%;
  }

  .inner-slide {
    width: 200%;
    grid-template-columns: repeat(24, 1fr);
    transition: 350ms ease-in-out;
    transform: translateX(0);

    &.slide-active {
      transform: translateX(-50%);
    }
  }
  ${breakpointLargeTablet} {
    .controls {
      display: none;
    }
    .inner-slide {
      width: 100%;
      grid-template-columns: repeat(12, 1fr);
    }
    // Two cards across
    article {
      grid-column: span 6;
    }
  }

  ${breakpointTinyTablet} {
    // Two cards across
    article {
      grid-column: span 12;
      --media-radius: 0.5rem;
      --title-size: 1rem;
      --title-margin: 0.5rem 0;
      --excerpt-display: block;

      grid-column-gap: 0.5rem;
      grid-template-rows: minmax(0, 1fr) 46px;
      grid-template-columns: 100px minmax(0, 1fr);

      .media-block {
        margin: 0.5rem;
        width: 100%;
        grid-row: span 2;
      }

      .details {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
      }
      .footer {
        grid-template-columns: 1fr;
      }
    }
    .inner-slide {
      width: 100%;
      grid-template-columns: repeat(12, 1fr);
      transform: translateX(0);
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
    --media-radius: 0.5rem;
    --title-size: 0.825rem;
    --title-margin: 0.5rem 0;
    --excerpt-display: none;

    .media-block {
      margin: 0.5rem;
      width: 100%;
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
  }

  ${breakpointMediumTablet} {
    article {
      --excerpt-display: block;
      --title-size: 1rem;
      /* grid-template-columns: 100px minmax(0, 1fr); */
      grid-column: span 12;
    }
  }
`
