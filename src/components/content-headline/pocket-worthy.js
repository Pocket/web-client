import React from 'react'
import { css } from '@emotion/css'

import { breakpointLargeHandset } from 'common/constants'
import { useTranslation } from 'next-i18next'

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
  const { t } = useTranslation()

  return (
    <div className={PocketWorthyWrapper}>
      {t('discover:pocket-worthy', 'Pocket worthy')}
      <span>{t('discover:stories-to-fuel-your-mind', 'Stories to fuel your mind.')}</span>
    </div>
  )
}
