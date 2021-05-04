import { cardsGrid } from 'components/items-layout/base'
import { css } from 'linaria'
import { breakpointSmallTablet } from '@pocket/web-ui'
import { breakpointTinyTablet } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'

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
  article {
    height: 351px;
  }
  ${breakpointSmallTablet} {
    article {
      height: 326px;
    }
  }
  ${breakpointTinyTablet} {
    article {
      height: 174px;
    }
  }
  ${breakpointLargeHandset} {
    article {
      height: 154px;
    }
  }
`

export const cardList = css`
  ${cardsGrid};
  grid-row-gap: 0;
`
export const cardDetail = css`
  ${cardsGrid};
  grid-row-gap: 0;
`
