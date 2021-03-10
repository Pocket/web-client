import React from 'react'
import { css, cx } from 'linaria'
import { Button } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui' // 1023
import { breakpointMediumTablet } from '@pocket/web-ui' // 959
import { breakpointTinyTablet } from '@pocket/web-ui' // 719
import { breakpointMediumHandset } from '@pocket/web-ui' // 479
import { breakpointSmallHandset } from '@pocket/web-ui' // 399
import { SIGNUP_URL } from 'common/constants'
import laptopImg from 'static/images/laptop-mylist.png'

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

export function CallOutBuildHome() {
  return (
    <div className={wrapper}>
      <aside>
        <p className="h3 title">Build a home for everything that interests&nbsp;you</p>
        <p className="subtext">
          Add the <span className="pocket-svg"></span> button to your browser to
          collect articles, videos, and links from across the web. Use our app
          to enjoy them on any device in a distraction-free environment.
        </p>
        <Button
          id="explore-signup-hero" // needed for snowplow identifier
          variant="brand"
          target="_blank"
          href={`${SIGNUP_URL}?utm_source=explore&utm_medium=web`}>
          Sign&nbsp;Up
        </Button>
      </aside>
      <div className="img-wrapper">
        <img src={laptopImg} />
      </div>
    </div>
  )
}
