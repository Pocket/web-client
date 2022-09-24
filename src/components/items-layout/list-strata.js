import { css } from 'linaria'
import { cardsGrid } from 'components/items-layout/base'
import { breakpointLargeHandset } from 'common/constants'

export const listStrata = css`
  ${cardsGrid};
  grid-column-gap: 3.5rem;
  grid-row-gap: 2rem;
  padding: 1.375rem 0 0;

  ${breakpointLargeHandset} {
    border-bottom: 0;
    padding: 1rem 0 0;
  }
`

export const listStrataNext = css`
  ${cardsGrid};
  grid-column-gap: 1.5rem;
  grid-row-gap: 2rem;
  padding: 1.375rem 0 0;

  ${breakpointLargeHandset} {
    border-bottom: 0;
    padding: 1rem 0 0;
  }
`
