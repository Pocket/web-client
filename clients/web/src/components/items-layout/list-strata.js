import { css } from '@emotion/css'
import { cardsGrid } from 'components/items-layout/base'
import { breakpointLargeHandset } from 'common/constants'

export const listSlide = css`
  width: 100%;
  padding-bottom: 0.25rem;
`

export const listStrata = css`
  ${cardsGrid};
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  padding: 1.375rem 0 0;

  ${breakpointLargeHandset} {
    border-bottom: 0;
    padding: 1rem 0 0;
  }

  &.slideSection {
    width: 200%;
    grid-template-columns: repeat(24, 1fr);
    transition: 350ms ease-in-out;
    transform: translateX(0);
    &.slide {
      transform: translateX(-50%);
    }
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
