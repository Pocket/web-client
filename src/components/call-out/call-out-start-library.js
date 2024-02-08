import React from 'react'
import { css } from '@emotion/css'
import { CrossIcon } from 'components/icons/CrossIcon'
import { SIGNUP_URL } from 'common/constants'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
import { breakpointSmallDesktop } from 'common/constants' // 1023
import { breakpointLargeTablet } from 'common/constants' // 1023
import { useTranslation, Trans } from 'next-i18next'

const wrapper = css`
  position: relative;
  margin-top: var(--spacing650);

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

  .pocket-svg {
    display: inline-block;
    position: relative;
    height: 1.125rem;
    width: 1.25rem;
    content: ' ';
    background-image: url('data:image/svg+xml;utf8,<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.46333 2.16671C2.244 2.16671 2.06283 2.34971 2.06283 2.57925V7.62041C2.06283 12.0431 5.6089 15.625 9.97949 15.625C14.3501 15.625 17.8962 12.0431 17.8962 7.62041V2.57925C17.8962 2.34971 17.715 2.16671 17.4957 2.16671H2.46333ZM2.46333 0.583374H17.4957C18.593 0.583374 19.4795 1.4788 19.4795 2.57925V7.62041C19.4795 12.9141 15.2281 17.2084 9.97949 17.2084C4.73086 17.2084 0.479492 12.9141 0.479492 7.62041V2.57925C0.479492 1.4788 1.36596 0.583374 2.46333 0.583374ZM13.3833 5.95582C13.6954 5.64959 14.1966 5.65432 14.5029 5.96639C14.8091 6.27846 14.8044 6.77969 14.4923 7.08592L10.534 10.9702C10.2261 11.2724 9.73292 11.2724 9.42501 10.9702L5.46668 7.08592C5.15461 6.77969 5.14987 6.27846 5.45611 5.96639C5.76234 5.65432 6.26357 5.64959 6.57564 5.95582L9.97949 9.29599L13.3833 5.95582Z" fill="%231A1A1A"/></svg>');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    margin: auto 0.125rem -0.25rem;
  }

  .start-button:hover {
    background-color: var(--color-actionPrimary);
    text-decoration: underline;
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

  ${breakpointSmallDesktop} {
    h6 {
      font-size: var(--fontSize175);
      line-height: 129%;
    }
  }
`

export function CallOutStartLibrary({
  dismissChyron,
  completeChyron,
  handleDismiss,
  handleComplete,
  onVisible
}) {
  const { t } = useTranslation()

  function handleCloseClick() {
    handleDismiss()
    dismissChyron()
  }

  function handleButtonClick() {
    handleComplete()
    completeChyron()
  }

  return (
    <VisibilitySensor onVisible={onVisible}>
      <aside className={wrapper}>
        <div>
          <button onClick={handleCloseClick} className="close-button inline">
            <CrossIcon />
          </button>

          <h6>
            {t(
              'discover:save-these-to-personal-library',
              'Save these stories in a personal library'
            )}
          </h6>
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
            <Trans i18nKey="discover:build-your-library">
              Use the <span className="pocket-svg"></span> button to build your personal library of
              articles right in Pocket. Read them when you’re free in a quiet, calm space.
            </Trans>
          </p>
          <a
            className="button primary start-button"
            target="_blank"
            rel="noreferrer"
            onClick={handleButtonClick}
            href={`${SIGNUP_URL}?src=web-library-callout&utm_source=${global.location.href}&utm_medium=web`}>
            {t('discover:start-your-library', 'Start your library')}
          </a>
        </div>
      </aside>
    </VisibilitySensor>
  )
}

const ExplorePosition = css`
  position: relative;
  display: grid;
  width: 100%;
  height: 0;
  background-color: rgba(0, 0, 0, 0.4);
  align-items: start;
  justify-content: space-between;
  grid-column-gap: var(--spacing150);
  grid-row-gap: var(--spacing150);
  /* this is a 12 column grid */
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: dense;

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
