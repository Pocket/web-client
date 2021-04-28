import { css } from 'linaria'
import { cardsGrid } from './base'

import { breakpointSmallHandset } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { breakpointTinyTablet } from '@pocket/web-ui'
import { breakpointMediumTablet } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'

export const cardLockup = css`
  ${cardsGrid};
  border-bottom: 1px solid var(--color-dividerTertiary);

  .no-border & {
    border-bottom: none;
  }

  /**
    * nth-child(1) is the hero item. It's placed in position by the container
    * class (heroCenter, heroLeft, heroRight).
    * - At medium tablet all versions switch to the left side.
    * - At tiny tablet all versions switch to a full width alignment
   */
  &.heroCenter article:nth-child(1) {
    grid-column: 4 / span 6;
  }

  &.heroLeft article:nth-child(1) {
    grid-column: 1 / span 6;
  }

  &.heroRight article:nth-child(1) {
    grid-column: 7 / span 6;
  }

  &.heroCenter article:nth-child(1),
  &.heroLeft article:nth-child(1),
  &.heroRight article:nth-child(1) {
    ${breakpointMediumTablet} {
      grid-column: 1 / span 8;
    }
    ${breakpointTinyTablet} {
      grid-column: 1 / -1;
    }
  }

  /**  Everything below here is consistent across all lockups */
  article {
    grid-column: span 3;
    .excerpt {
      display: none;
    }

    &:nth-child(1) {
      grid-row: 1 / span 2;
      .media {
        width: 100%;
      }

      .excerpt {
        display: block;
      }

      .details {
        padding: var(--spacing075) 0 var(--spacing100);
      }

      .title {
        font-size: var(--fontSize200);
        line-height: 1.212;
        padding: var(--spacing150) 0 0;
      }
    }

    &:nth-child(n + 4),
    &:nth-child(1) {
      border-bottom: none;
    }

    &:nth-child(n + 2) {
      .title {
        font-size: var(--fontSize125);
        line-height: 1.263;
      }
    }

    ${breakpointLargeTablet} {
      &:nth-child(1) {
        .title {
          font-size: var(--fontSize175);
          line-height: 1.179;
        }
      }
      .details,
      .excerpt {
        font-size: var(--fontSize085);
        line-height: 1.429;
      }
    }

    /*
      ┌───────┐ ┌───┐
      │       │ └───┘
      │       │ ┌───┐
      └───────┘ └───┘
      ┌─────┐ ┌─────┐
      └─────┘ └─────┘
    */

    ${breakpointMediumTablet} {
      grid-column: span 4;
      &:nth-child(1) {
        position: relative;
        border-bottom: 1px solid var(--color-dividerTertiary);
        &:after {
          display: block;
          position: absolute;
          background-color: var(--color-dividerTertiary);
          content: '';
          height: 1px;
          width: 24px;
          bottom: -1px;
          right: -24px;
        }
      }
      &:nth-child(n + 4) {
        grid-column: span 6;
      }
    }

    /*
      ┌─────────────┐
      │             │
      │             │
      └─────────────┘
      ┌─────┐ ┌─────┐
      └─────┘ └─────┘
      ┌─────┐ ┌─────┐
      └─────┘ └─────┘
    */

    ${breakpointTinyTablet} {
      grid-column: span 6;
      &:nth-child(1) {
        border-bottom: 1px solid var(--color-dividerTertiary);

        .details {
          padding: var(--spacing050) 0;
        }

        .title {
          padding: var(--spacing100) 0 0;
        }

        &:after {
          display: none;
        }
      }
      &:nth-child(2) {
        position: relative;
        &:after {
          display: block;
          position: absolute;
          background-color: var(--color-dividerTertiary);
          content: '';
          height: 1px;
          width: 24px;
          bottom: -1px;
          right: -24px;
        }
      }
    }

    ${breakpointLargeHandset} {
      &:nth-child(n + 2) {
        .title {
          font-size: var(--fontSize100);
          line-height: 1.25;
        }
        &:nth-child(n + 2) {
          .card-actions {
            min-width: initial;
            margin-right: var(--size050);
          }
        }
      }
    }

    ${breakpointSmallHandset} {
      &:nth-child(1) {
        .title {
          font-size: var(--fontSize125);
        }
      }
    }
  }
`
