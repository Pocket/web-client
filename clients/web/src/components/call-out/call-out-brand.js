import React from 'react'
import { css, cx } from '@emotion/css'
import { breakpointLargeTablet } from 'common/constants' // 1023
import { breakpointSmallTablet } from 'common/constants' // 839
import { breakpointLargeHandset } from 'common/constants' // 599
import { breakpointSmallHandset } from 'common/constants' // 399
import { useTranslation } from 'next-i18next'

const wrapper = css`
  color: var(--color-textPrimary);
  width: 100%;
  padding: var(--spacing400) 0;
  border-bottom: var(--dividerStyle);

  &.noBorder {
    border-bottom: none;
    padding: 0 0 var(--spacing400) 0;
  }

  .brandBlock {
    display: flex;
    justify-content: center;
    width: 100%;
    position: relative;
    overflow: hidden;
    padding-top: 24px;
  }

  blockquote {
    position: relative;
    text-align: center;
    max-width: 833px;
    background-color: var(--color-calloutBackgroundPrimary);
    padding: var(--spacing250) var(--size400);
    margin: 0;
    font-family: var(--fontSerifAlt);
    font-size: var(--fontSize175);
    font-weight: 500;
    line-height: 1.29;
  }

  aside {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    font-family: var(--fontSansSerif);
    font-size: var(--fontSize085);
    text-transform: uppercase;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 1px;
    z-index: var(--zIndexTooltip);
    padding: var(--spacing100);
    background-color: var(--color-calloutBackgroundSecondary);
  }

  .squiggle {
    stroke: var(--color-calloutAccent);
  }
  .copy {
    position: relative;
  }

  .zigzag {
    position: absolute;
    top: 0;
    left: calc(-1 * var(--size100));
    transform: translate(-100%, 50%);
  }

  /* 1023 */
  ${breakpointLargeTablet} {
    .brandBlock {
      padding-left: 18%;
      justify-content: flex-end;
    }
    blockquote {
      text-align: center;
      font-size: var(--fontSize150);
    }
    aside {
      font-size: var(--fontSize075);
    }
  }

  /* 839 */
  ${breakpointSmallTablet} {
    .brandBlock {
      padding-top: var(--spacing150);
    }
    blockquote {
      padding: var(--size200) var(--size250);
    }
    aside {
      font-size: var(--fontSize075);
      padding: var(--spacing075);
    }
  }

  /* 599 */
  ${breakpointLargeHandset} {
    padding: var(--spacing250) 0;
    blockquote {
      font-size: var(--fontSize125);
    }
  }

  /* 399 */
  ${breakpointSmallHandset} {
    .brandBlock {
      padding-top: var(--spacing100);
    }
    blockquote {
      padding: var(--spacing100) var(--size150);
      font-size: var(--fontSize100);
    }
    aside {
      font-size: var(--fontSize065);
      padding: var(--spacing050);
    }
  }
`

export function CallOutBrand({ border = true }) {
  const { t } = useTranslation()
  const classNames = cx(wrapper, 'brandingMessage', !border && 'noBorder')
  return (
    <div className={classNames}>
      <div className="brandBlock">
        <aside>
          {t('call-out:interesting-stories', 'Interesting stories for interesting people')}
        </aside>
        <blockquote>
          <span className="copy">
            <svg
              className="zigzag"
              xmlns="http://www.w3.org/2000/svg"
              width="192"
              height="13"
              fill="none">
              <defs />
              <path
                className="squiggle"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M0 1.306c13.72 0 13.72 9.91 27.42 9.91 13.7 0 13.7-9.91 27.42-9.91 13.72 0 13.72 9.91 27.42 9.91 13.72 0 13.72-9.91 27.44-9.91s13.72 9.91 27.42 9.91c13.72 0 13.72-9.91 27.44-9.91s13.72 9.91 27.44 9.91"
              />
            </svg>
            {t(
              'call-out:pocket-is-where',
              'Pocket is where you’ll find fascinating stories from all across the web, right here in one place.'
            )}
          </span>
        </blockquote>
      </div>
    </div>
  )
}
