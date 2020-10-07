import { css } from 'linaria'
import { breakpointLargeTablet } from '@pocket/web-ui'

export const myListContainer = css`
  display: grid;
  align-items: start;
  justify-content: space-between;
  grid-column-gap: var(--spacing150);
  grid-row-gap: spacing150;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: dense;

  ${breakpointLargeTablet} {
    grid-column-gap: var(--spacing150);
    grid-row-gap: var(--spacing150);
  }
`

export const myListNavigation = css`
  grid-column: span 2;
`

export const myListMain = css`
  grid-column: span 10;
`
