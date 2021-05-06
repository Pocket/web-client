import { css, cx } from 'linaria'
import { breakpointSmallTablet } from '@pocket/web-ui'

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
`

const cardPageSectionStyle = css`
  margin-bottom: 0;
  .sectionSubTitle {
    margin: 0;
  }
  .collectionSubTitle {
    margin: 0 0 1rem;
  }
`

const cardPageSubheaderLinkStyle = css`
  display: flex;
  justify-content: space-between;

  a {
    margin-bottom: 1.5rem;
    font-family: 'Graphik Web';
    text-decoration: none;
    color: var(--color-actionPrimary);
    &:hover {
      text-decoration: underline;
      color: var(--color-actionPrimaryHover);
    }
  }

  ${breakpointSmallTablet} {
    flex-direction: column;
    p {
      margin-bottom: 0.5rem;
    }
  }
`

export const HomeJourneyHeader = ({ sectionTitle, sectionDescription }) => {
  return sectionTitle ? (
    <header className={cardPageHeaderStyle}>
      <h2 className="pageTitle">{sectionTitle}</h2>
      {sectionDescription ? <p>{sectionDescription}</p> : null}
    </header>
  ) : null
}

export const HomeSectionHeader = ({ sectionTitle, sectionDescription }) => {
  return sectionTitle ? (
    <header className={cx(cardPageHeaderStyle, cardPageSectionStyle)}>
      <h2 className="sectionTitle">{sectionTitle}</h2>
      {sectionDescription ? <p className="sectionSubTitle">{sectionDescription}</p> : null}
    </header>
  ) : null
}

export const HomeCollectionHeader = ({ sectionTitle, sectionDescription }) => {
  return sectionTitle ? (
    <header className={cx(cardPageHeaderStyle, cardPageSectionStyle)}>
      <h2 className="sectionTitle">{sectionTitle}</h2>
      {sectionDescription ? <p className="collectionSubTitle">{sectionDescription}</p> : null}
    </header>
  ) : null
}

export const HomeTopicHeader = ({
  topicSlug,
  sectionTitle,
  sectionDescription,
  clickEvent,
  showViewMore
}) => {
  return sectionTitle ? (
    <header className={cardPageHeaderStyle}>
      <h3 className="sectionTitle">{sectionTitle}</h3>
      <div className={cardPageSubheaderLinkStyle}>
        {sectionDescription ? <p>{sectionDescription}</p> : null}
        {showViewMore ? (
          <a
            href={`https://getpocket.com/explore/${topicSlug}?src=home-view-more`}
            target="_topic"
            onClick={clickEvent}>
            View More Articles
          </a>
        ) : null}
      </div>
    </header>
  ) : null
}
