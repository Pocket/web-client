import { cardsGrid } from 'components/items-layout/base'
import { css } from 'linaria'

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
`

export const cardList = css`
  ${cardsGrid};
  grid-row-gap: 0;
`
export const cardDetail = css`
  ${cardsGrid};
  grid-row-gap: 0;
`
