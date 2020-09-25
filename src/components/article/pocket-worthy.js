import React from 'react'
import { css } from 'linaria'

import { breakpointLargeHandset } from '@pocket/web-ui'

const PocketWorthyWrapper = css`
  font-family: var(--fontSansSerif);
  font-size: var(--fontSize085);
  color: var(--color-actionBrand);
  letter-spacing: 0.014em;
  font-weight: 300;
  text-transform: uppercase;

  span {
    color: var(--color-textTertiary);
    letter-spacing: 0;
    text-transform: none;

    &:before {
      content: '·';
      padding: 0 10px;
      font-size: 0.875em;
    }
  }

  ${breakpointLargeHandset} {
    span {
      display: none;
    }
  }
`

export function PocketWorthy() {
  return (
    <div className={PocketWorthyWrapper}>
      Pocket worthy
      <span>Stories to fuel your mind.</span>
    </div>
  )
}
