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
