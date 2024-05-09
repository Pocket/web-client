import React from 'react'
import { css } from '@emotion/css'
import { breakpointSmallDesktop } from 'common/constants' // 1023
import { breakpointLargeTablet } from 'common/constants' // 1023
import { useTranslation, Trans } from 'next-i18next'

const wrapper = css`
  position: relative;
  margin-top: 6.5rem;
  grid-row: span 5;
  grid-column: 10/-1;

  &:before {
    position: absolute;
    top: -24px;
    left: -24px;
    height: 375px;
    width: 100%;
    content: ' ';
    background-color: var(--color-calloutBackgroundSecondary);
  }

  div {
    background-color: var(--color-calloutBackgroundPrimary);
    padding: 3.625rem var(--spacing150) var(--spacing150);
    width: 100%;
    position: relative;
  }

  h6 {
    font-family: var(--fontSerifAlt);
    font-size: 2.3125rem;
    font-weight: 500;
    line-height: 119%;
    margin-bottom: 1.875rem;
    color: var(--color-textPrimary);
  }

  .zigzag {
    stroke: var(--color-calloutAccent);
    margin-left: -78px;
    margin-bottom: var(--spacing150);
  }

  p {
    font-family: var(--fontSansSerif);
    font-size: 1rem;
    line-height: 150%;
    color: var(--color-textPrimary);
  }

  ${breakpointSmallDesktop} {
    h6 {
      font-size: var(--fontSize175);
      line-height: 129%;
    }
  }

  ${breakpointLargeTablet} {
    display: none;
  }
`

export function CallOutCollection() {
  const { t } = useTranslation()
  const title = t('collections:call-out-title', "Find what's worth reading")  
  return (
    <aside className={wrapper}>
      <div>
        <h6>{title}</h6>
        <svg
          className="zigzag"
          xmlns="http://www.w3.org/2000/svg"
          width="192"
          height="13"
          fill="none">
          <defs />
          <path
            stroke="#221F1F"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M0 1.306c13.72 0 13.72 9.91 27.42 9.91 13.7 0 13.7-9.91 27.42-9.91 13.72 0 13.72 9.91 27.42 9.91 13.72 0 13.72-9.91 27.44-9.91s13.72 9.91 27.42 9.91c13.72 0 13.72-9.91 27.44-9.91s13.72 9.91 27.44 9.91"
          />
        </svg>
        <p>
          <Trans i18nKey="collections:call-out-body">
            Take the guesswork out of your next great read. Pocket lists put the best of the
            internet at your fingertips.
          </Trans>
        </p>
      </div>
    </aside>
  )
}
