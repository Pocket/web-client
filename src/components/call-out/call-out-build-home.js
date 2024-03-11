import React from 'react'
import { css, cx } from '@emotion/css'
import { breakpointLargeTablet } from 'common/constants' // 1023
import { breakpointMediumTablet } from 'common/constants' // 959
import { breakpointTinyTablet } from 'common/constants' // 719
import { breakpointMediumHandset } from 'common/constants' // 479
import { breakpointSmallHandset } from 'common/constants' // 399
import { SaveIcon } from '@ui/icons/SaveIcon'
import { SIGNUP_URL } from 'common/constants'
import laptopImg from 'static/images/laptop-mylist.png'
import { Trans, useTranslation } from 'next-i18next'

const wrapper = css`
  display: grid;
  align-items: start;
  justify-content: space-between;
  grid-column-gap: var(--spacing150);
  grid-row-gap: var(--spacing150);
  /* this is a 12 column grid */
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: dense;

  border-bottom: var(--dividerStyle);
  padding-bottom: var(--spacing250);
  margin-bottom: var(--spacing250);

  &.topBorder {
    margin-top: 2.5rem;
    padding: 3.5rem 0;
    border-top: var(--dividerStyle);
  }

  aside {
    grid-column-end: span 6;
  }

  .img-wrapper {
    grid-column-start: 7;
    grid-column-end: span 6;
    text-align: center;

    img {
      width: 100%;
      max-width: 360px;
    }
  }

  a {
    min-width: 188px;
    text-align: center;
  }

  .title {
    font-size: var(--fontSize200);
    font-family: 'Doyle';
    font-style: normal;
    font-weight: 500;
  }

  .subtext {
    display: block;
    font-family: 'Graphik Web';
    font-size: var(--fontSize100);
  }

  .icon {
    font-size: 1.3rem;
    margin-top: -0.25rem;
  }

  ${breakpointLargeTablet} {
    .title {
      font-size: var(--fontSize175);
    }
  }
  ${breakpointMediumTablet} {
    padding-bottom: var(--spacing150);
    .title {
      font-size: var(--fontSize150);
    }
    .img-wrapper img {
      max-width: 240px;
    }
    .subtext {
      display: none;
    }
  }

  ${breakpointTinyTablet} {
    padding-bottom: var(--spacing100);

    .title {
      font-size: var(--fontSize125);
    }
    a {
      min-width: 140px;
    }
  }

  ${breakpointMediumHandset} {
    margin-bottom: 1.75rem;

    aside {
      display: flex;
      flex-direction: row;
      grid-column-end: span 12;
      justify-content: space-between;
    }
    .img-wrapper {
      display: none;
    }
    .title {
      margin-bottom: 0;
    }
    a {
      min-width: unset;
      margin-left: var(--spacing100);
    }
  }

  ${breakpointSmallHandset} {
    padding-bottom: var(--spacing150);
    margin-bottom: var(--spacing100);

    aside {
      flex-direction: column;
    }
    .title {
      margin-bottom: var(--spacing075);
    }
    a {
      width: 100%;
      margin-left: 0;
    }
  }
`

export function CallOutBuildHome({ topBorder }) {
  const { t } = useTranslation()
  return (
    <div className={cx(wrapper, topBorder && 'topBorder')} data-testid="signup-module">
      <aside>
        <p className="h3 title">
          {t('call-out:build-a-home', 'Build a home for everything that interests you')}
        </p>
        <p className="subtext">
          <Trans i18nKey="call-out:add-pocket-button">
            Add the <SaveIcon id="Pocket" title="Pocket" /> button to your browser to collect
            articles, videos, and links from across the web. Use our app to enjoy them on any device
            in a distraction-free environment.
          </Trans>
        </p>
        <a
          id="explore-signup-hero" // needed for snowplow identifier
          className="button brand"
          target="_blank"
          rel="noreferrer"
          href={`${SIGNUP_URL}?src=web-add-callout&utm_source=${global.location.href}&utm_medium=web`}>
          {t('call-out:sign-up', 'Sign Up')}
        </a>
      </aside>
      <div className="img-wrapper">
        <img src={laptopImg.src} alt="" />
      </div>
    </div>
  )
}
