import { css } from 'linaria'
import { cardsGrid } from './cards-container'

import { breakpointSmallHandset } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { breakpointTinyTablet } from '@pocket/web-ui'
import { breakpointMediumTablet } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'

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
