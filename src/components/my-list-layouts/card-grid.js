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
      font-size: 1.5rem;
    }
  }
`
