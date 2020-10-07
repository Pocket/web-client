import { breakpointTinyTablet } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { spacing100 } from '@pocket/web-ui'
import { spacing150 } from '@pocket/web-ui'
import { css } from 'linaria'

// Adding this so we can compose within `css`
export const cardsGrid = {
  display: 'grid',
  alignItems: 'start',
  justifyContent: 'space-between',
  gridColumnGap: spacing150,
  /* this is a 12 column grid */
  gridTemplateColumns: 'repeat(12, 1fr)',
  gridAutoFlow: 'dense',
  [breakpointLargeHandset]: {
    gridColumnGap: spacing100,
    gridRowGap: spacing100
  }
}

export const cardsContainer = css`
  padding: var(--size250) 0 0;
  box-sizing: content-box;

  ${breakpointTinyTablet} {
    padding: var(--size250) 0 0;
  }

  ${breakpointLargeHandset} {
    padding: var(--size150) 0 0;
  }

  &.list + .list {
    padding-top: var(--spacing150);
  }

  &.no-border {
    border-bottom: none;
  }

  /* Hide all border on last article list or explicit no-border */
  &.no-border article:nth-last-of-type(3),
  &.no-border article:nth-last-of-type(2),
  &.no-border article:nth-last-of-type(1) {
    border-bottom: none;
  }

  /* First container and containers following a header have no padding*/
  header + &,
  h4 + & {
    padding-top: 0;
  }

  /* Lockups following a list need more padding */
  &.list + .lockupLeft,
  &.list + .lockupCenter,
  &.list + .lockupRight {
    border-top: 1px solid var(--color-dividerTertiary);
    padding-top: var(--spacing250);
  }
`
