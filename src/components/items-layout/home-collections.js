import { css } from 'linaria'
import { cardsGrid } from './base'

export const homeCollections = css`
  ${cardsGrid};
  grid-template-columns: repeat(2, 1fr);
`
