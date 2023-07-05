import { css } from '@emotion/css'
import { breakpointSmallDesktop } from 'common/constants' // 1023
import { breakpointMediumTablet } from 'common/constants' // 959

const wrapper = css`
  grid-column-start: 10;
  grid-column-end: span 3;
  margin-top: 2.5rem;
  position: relative;

  &:before {
    position: absolute;
    top: -24px;
    left: -24px;
    height: 100%;
    width: 100%;
    content: ' ';
    background-color: var(--color-newsroomBackgroundSecondary);
  }

  div {
    background-color: var(--color-newsroomBackgroundPrimary);
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
    color: var(--color-newsroomBackgroundText);
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
    color: var(--color-newsroomBackgroundText);
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
    color: var(--color-newsroomBackgroundText);
    &:hover {
      color: var(--color-newsroomBackgroundText);
    }
  }

  ${breakpointSmallDesktop} {
    h6 {
      font-size: var(--fontSize175);
      line-height: 129%;
    }

    grid-column: 2/9;
    grid-row-start: 3;
    margin: 0 0 4rem 0;
  }

  ${breakpointMediumTablet} {
    grid-column: 2/-2;
  }
`

export function CallOutNewsroom() {
  return (
    <aside className={wrapper}>
      <div>
        <h6>How to Support Your Local Newsroom</h6>
        <ol>
          <li>
            Find your local newsroom using{' '}
            <a href="https://findyournews.org/campaign/inn-network-directory" target="_blank">
              this&nbsp;database
            </a>
          </li>
          <li>If they have a newsletter, subscribe and share it with friends</li>
          <li>Support your local news organization with a recurring donation</li>
          <li>
            Learn more about the{' '}
            <a href="https://www.theajp.org/why-local-news/" target="_blank">
              state of local news
            </a>
          </li>
          <li>Save local stories in Pocket to read whenever, wherever</li>
        </ol>
      </div>
    </aside>
  )
}
