import React from 'react'
import { css } from '@emotion/css'

import { breakpointSmallDesktop } from 'common/constants' // 1023
import { breakpointLargeTablet } from 'common/constants' // 1023
import { useTranslation } from 'next-i18next'

const wrapper = css`
  position: relative;
  display: grid;
  width: 100%;
  height: 0;
  background-color: rgba(0, 0, 0, 0.4);
  align-items: start;
  justify-content: space-between;
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  /* this is a 12 column grid */
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: dense;

  section {
    grid-column-start: 10;
    grid-column-end: span 3;
    margin-top: 2/5rem;
  }

  aside {
    position: relative;

    &:before {
      position: absolute;
      top: -24px;
      left: -24px;
      height: 375px;
      width: 100%;
      content: ' ';
      background-color: #db6900;
    }

    div {
      background-color: #fff0e3;
      padding: 2rem 1.5rem 1.5rem;
      width: 100%;
      position: relative;
    }

    h6 {
      font-family: var(--fontSerifAlt);
      font-size: 1.75rem;
      font-weight: 500;
      line-height: 119%;
      margin-bottom: 1.875rem;
      color: var(--color-textPrimary);
    }

    .zigzag {
      stroke: var(--color-calloutAccent);
      margin-left: -78px;
      margin-bottom: 1.5rem;
    }

    ol {
      font-family: var(--fontSansSerif);
      font-size: 1rem;
      line-height: 150%;
      color: var(--color-textPrimary);
      margin: 0;
      padding: 0.5rem;
      li {
        padding: 0.5rem;
      }
    }

    a {
      width: 100%;
      text-align: center;
    }

    .close-button {
      position: absolute;
      right: var(--spacing100);
      top: var(--spacing100);
      font-size: var(--fontSize175);
      color: var(--color-textPrimary);
      &:hover {
        color: var(--color-textPrimary);
      }
    }
  }
  ${breakpointSmallDesktop} {
    h6 {
      font-size: var(--fontSize175);
      line-height: 129%;
    }
  }
`

export function BannerNewsroom() {
  const { t } = useTranslation()

  return (
    <div className={wrapper}>
      <section>
        <aside>
          <div>
            <h6>{t('banner:newsroom', 'How to Support Your Local Newsroom')}</h6>
            <ol>
              <li>
                Find your local newsroom using{' '}
                <a href="https://findyournews.org/campaign/inn-network-directory">
                  this&nbsp;database
                </a>
              </li>
              <li>If they have a newsletter, subscribe and share it with friends</li>
              <li>Support your local news organization with a recurring donation</li>
              <li>
                Learn more about the
                <a href="https://www.theajp.org/why-local-news/"> state of local news</a>
              </li>
              <li>Save local stories in Pocket to read whenever, wherever</li>
            </ol>
          </div>
        </aside>
      </section>
    </div>
  )
}

const ExplorePosition = css`
  section {
    grid-column-start: 10;
    grid-column-end: span 3;
    margin-top: var(--size250);
  }

  ${breakpointLargeTablet} {
    display: none;
  }
`

export function CallOutStartLibraryExplore({
  handleImpression,
  handleDismiss,
  handleComplete,
  isAuthenticated
}) {
  return (
    <div className={ExplorePosition}>
      {isAuthenticated ? null : (
        <section>
          <CallOutStartLibrary
            onVisible={handleImpression}
            handleDismiss={handleDismiss}
            handleComplete={handleComplete}
          />
        </section>
      )}
    </div>
  )
}
