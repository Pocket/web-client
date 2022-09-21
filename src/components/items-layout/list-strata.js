import { css } from 'linaria'
import { cardsGrid } from 'components/items-layout/base'
import { breakpointLargeHandset } from 'common/constants'

export const listStrata = css`
  ${cardsGrid};
  grid-column-gap: 3.5rem;
  grid-row-gap: 2rem;
  padding: 2rem 0 0;
  .title {
    font-size: 1.1875rem;
  }

  ${breakpointLargeHandset} {
    border-bottom: 0;
    padding: 1rem 0 0;
  }
`
