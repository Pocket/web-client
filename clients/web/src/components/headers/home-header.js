import { css, cx } from '@emotion/css'
import { breakpointSmallTablet } from 'common/constants'
import Link from 'next/link'

const cardPageHeaderStyle = css`
  margin-bottom: 1rem;
  h1,
  h2,
  h3,
  h4 {
    font-family: 'Graphik Web';
    font-style: normal;
    font-weight: 600;
  }

  h2 {
    font-size: 1.75rem;
    line-height: 1.2;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.5rem;
    line-height: 1.2;
    margin-bottom: 0.5rem;
  }

  p {
    font-weight: 300;
    font-family: 'Graphik Web';
    font-style: normal;
    font-size: 1rem;
    color: var(--color-textSecondary);
  }
  a {
    font-size: 1rem;
    font-weight: 400;
    font-family: 'Graphik Web';
    text-decoration: none;
    color: var(--color-textSecondary);
    &:hover {
      color: var(--color-textLinkHover);
      text-decoration: underline;
    }
    &:active {
      color: var(--color-textLinkPressed);
    }
  }
`

const homeHeaderStyle = css`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: baseline;
  margin-bottom: 0;

  .subheadline {
    grid-column-start: 1;
  }

  .morelink {
    display: flex;
    justify-content: flex-end;
    a,
    button {
      &:focus {
        outline: none;
      }
      color: var(--color-actionPrimary);
      &.text {
        padding: 0;
      }
    }
    & + .subheadline {
      grid-row-start: 2;
    }

    ${breakpointSmallTablet} {
      justify-content: flex-start;
      a,
      button {
        padding-left: 0;
      }
    }
  }

  ${breakpointSmallTablet} {
    grid-template-columns: 100%;
  }
`

export const HomeHeader = ({ headline, subheadline, moreLinkText, moreLinkUrl, moreLinkClick }) => {
  return headline ? (
    <header className={cx(cardPageHeaderStyle, homeHeaderStyle)}>
      <h2 className="headline">{headline}</h2>
      {subheadline ? <div className="subheadline">{subheadline}</div> : null}
      {moreLinkText ? (
        <div className="morelink">
          <HomeMoreLink
            moreLinkText={moreLinkText}
            moreLinkUrl={moreLinkUrl}
            moreLinkClick={moreLinkClick}
          />
        </div>
      ) : null}
    </header>
  ) : null
}

const HomeMoreLink = ({ moreLinkUrl, moreLinkText, moreLinkClick }) => {
  const handleClick = () => moreLinkClick(moreLinkText)

  if (moreLinkUrl) {
    return (
      <Link href={moreLinkUrl} onClick={handleClick}>
        {moreLinkText}
      </Link>
    )
  }
  if (moreLinkText) {
    return (
      <button className="inline text" onClick={handleClick}>
        {moreLinkText}
      </button>
    )
  }
}
