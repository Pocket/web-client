import { cardsGrid } from 'components/items-layout/base'
import { css } from '@emotion/css'
import { breakpointSmallTablet } from 'common/constants'
import { breakpointTinyTablet } from 'common/constants'
import { breakpointLargeHandset } from 'common/constants'

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
