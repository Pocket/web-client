import { cardsGrid } from 'components/items-layout/base'
import { css, cx } from 'linaria'
import { breakpointSmallDesktop } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'
import { breakpointMediumTablet } from '@pocket/web-ui'
import { breakpointSmallTablet } from '@pocket/web-ui'
import { breakpointTinyTablet } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { breakpointSmallHandset } from '@pocket/web-ui'
import { breakpointMediumHandset } from '@pocket/web-ui'

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
  grid-row-gap: var(--size100);
  article {
    height: 345px;
    grid-column: span 4;
  }

  /* 839 */
  ${breakpointSmallTablet} {
    article {
      height: 310px;
    }
  }

  /* 719 */
  ${breakpointTinyTablet} {
    --grid-media: 200px;
    --grid-height: 150px;
  }

  /* 599 */
  ${breakpointLargeHandset} {
    --grid-media: 150px;
    --grid-height: 130px;
  }

  /* 399 */
  ${breakpointSmallHandset} {
    --grid-media: 100px;
    --grid-height: 130px;
  }

  /* This is when we switch to a side by side layout */
  ${breakpointTinyTablet} {
    grid-row-gap: var(--size150);
    article {
      height: var(--grid-height);
      grid-column: span 12;
      border-bottom: var(--dividerStyle);
    }
  }
`

export const cardList = css`
  ${cardsGrid};
  grid-row-gap: 0;

  article {
    grid-column: span 12;
  }
  /* 479 */

  ${breakpointMediumHandset} {
    --grid-height: 130px;
  }
`
export const cardDetail = css`
  ${cardsGrid};
  grid-row-gap: 0;

  article {
    grid-column: span 12;
  }

  /* 1023 */
  ${breakpointLargeTablet} {
    article {
      .tags {
        grid-column: 1 / span 9;
      }
      .actions {
        grid-column: 10 / span 3;
      }
    }
  }

  /* 959 */
  ${breakpointMediumTablet} {
    article {
      .tags {
        grid-column: 1 / span 8;
      }
      .actions {
        grid-column: 9 / span 4;
      }
    }
  }

  /* 839 */
  ${breakpointSmallTablet} {
    article {
      .tags {
        grid-column: 1 / span 8;
      }
      .actions {
        grid-column: 9 / span 3;
      }
    }
  }

  /* 719 */
  ${breakpointTinyTablet} {
    article {
      height: 185px;
      .tags {
        grid-column: span 12;
      }
      .actions {
        grid-column: span 12;
        padding-top: 0.5rem;
        justify-content: flex-end;
      }
    }
  }

  /* 599 */
  ${breakpointLargeHandset} {
    article {
      .content {
        grid-column: span 12;
      }
      .media {
        display: none;
      }
    }
  }

  /* 479 */
  ${breakpointMediumHandset} {
  }

  /* 399 */
  ${breakpointSmallHandset} {
  }
`
