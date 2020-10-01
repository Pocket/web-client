import { css } from 'linaria'
import { cardsGrid } from './cards-container'
import { breakpointSmallHandset } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { breakpointTinyTablet } from '@pocket/web-ui'
import { breakpointMediumTablet } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'

/**
 * Article cards represented in a wide-box list format.
 */
export const cardList = css`
  ${cardsGrid};

  article {
    grid-column: span 12;
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
      padding-bottom: 0.5rem;
    }

    .title {
      padding: 0;
      font-size: var(--fontSize100);
      line-height: 1.286;
    }

    .details {
      font-size: var(--fontSize075);
      line-height: 1.5;
    }

    .excerpt {
      font-size: var(--fontSize100);
      display: none;
    }

    .footer {
    }

    .actions {
      grid-column: 4 / span 5;
    }
  }
`
