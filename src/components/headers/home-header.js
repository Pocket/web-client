import { css, cx } from 'linaria'
import { useTranslation } from 'next-i18next'
import { CrossIcon } from 'components/icons/CrossIcon'
import { breakpointMediumHandset } from 'common/constants'
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
    color: var(--color-actionPrimary);
    display: flex;
    justify-content: flex-end;
  }

  .moreLink + .subheadline {
    grid-row-start: 2;
    color: pink !important;
  }
`

const cardPageSectionStyle = css`
  margin-bottom: 0;
  .sectionSubTitleWrapper {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    ${breakpointMediumHandset} {
      flex-direction: column;
    }

    a {
      color: var(--color-actionPrimary);
      margin-top: 0;

      &:hover {
        color: var(--color-actionPrimaryHover);
      }

      ${breakpointMediumHandset} {
        margin-top: 0.5rem;
      }
    }
  }

  .sectionSubTitle {
    margin: 0;
  }
`

const cardPageCollectionStyle = css`
  margin-bottom: 0;
  margin-top: 2rem;
  .sectionSubTitle {
    margin: 0;
  }
`

const cardPageLineupStyle = css`
  margin: 3rem 0 0;
  .sectionSubTitle {
    margin: 0;
  }
`
const cardPageTopicStyle = css`
  margin-top: 3rem;
`

const cardPageSimilarStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0;
  .sectionSubTitle {
    margin: 0;
  }
  .close {
    cursor: pointer;
    font-size: 1.5rem;
    margin-top: 0;
  }
`

const lineupSpacerStyle = css`
  padding: 2rem 0;
`

const cardMixHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  .action {
    color: var(--color-actionPrimary);
    &:hover {
      color: var(--color-actionPrimaryHover);
    }
  }

  ${breakpointMediumHandset} {
    flex-direction: column;
    align-items: flex-start;
    .action {
      margin-top: 0.5rem;
      padding: 0;
    }
  }
`

export const HomeUnifiedHeader = ({
  headline,
  subheadline,
  moreLinkText,
  moreLinkUrl,
  moreLinkClick
}) => {
  return headline ? (
    <header className={cx(cardPageHeaderStyle, homeHeaderStyle)}>
      <h2 className="headiline">{headline}</h2>
      {subheadline ? <div className="subheadline">{subheadline}</div> : null}
      {moreLinkText ? (
        <HomUnifiedMoreLink
          moreLinkText={moreLinkText}
          moreLinkUrl={moreLinkUrl}
          moreLinkClick={moreLinkClick}
        />
      ) : null}
    </header>
  ) : null
}

const HomUnifiedMoreLink = ({ moreLinkUrl, moreLinkText, moreLinkClick }) => {
  return moreLinkUrl ? (
    <Link href={moreLinkUrl}>
      <a onClick={moreLinkClick} className="morelink">
        {moreLinkText}
      </a>
    </Link>
  ) : null
}

export const HomeJourneyHeader = ({ sectionTitle, sectionDescription }) => {
  return sectionTitle ? (
    <header className={cardPageHeaderStyle}>
      <h2 className="pageTitle">{sectionTitle}</h2>
      {sectionDescription ? <p>{sectionDescription}</p> : null}
    </header>
  ) : null
}

export const HomeSectionHeader = ({
  sectionTitle,
  sectionDescription,
  sectionLinkText,
  sectionLinkDestination,
  sectionLinkClick
}) => {
  return sectionTitle ? (
    <header className={cx(cardPageHeaderStyle, cardPageSectionStyle)}>
      <h2 className="sectionTitle">{sectionTitle}</h2>
      <div className="sectionSubTitleWrapper">
        {sectionDescription ? <p className="sectionSubTitle">{sectionDescription}</p> : null}
        {sectionLinkText ? (
          <Link href={sectionLinkDestination}>
            <a onClick={sectionLinkClick}>{sectionLinkText}</a>
          </Link>
        ) : null}
      </div>
    </header>
  ) : null
}

export const HomeCollectionHeader = ({ sectionTitle, clickEvent }) => {
  const { t } = useTranslation()

  return sectionTitle ? (
    <header className={cx(cardPageHeaderStyle, cardPageCollectionStyle)}>
      <h2 className="sectionTitle">{sectionTitle}</h2>
      <div className="sectionSubtitle">
        <Link href="/collections/?src=home-view-more">
          <a onClick={clickEvent}>{t('home:view-more-collections', 'View More Collections')}</a>
        </Link>
      </div>
    </header>
  ) : null
}

export const HomeTopicHeader = ({ topicSlug, sectionTitle, clickEvent }) => {
  return sectionTitle ? (
    <header className={cx(cardPageHeaderStyle, cardPageTopicStyle)}>
      <h3 className="sectionTitle">
        {sectionTitle}
        <div className="sectionSubtitle">
          <Link href={`/explore/${topicSlug}?src=home-view-more`}>
            <a onClick={clickEvent}>Find more articles on {sectionTitle}</a>
          </Link>
        </div>
      </h3>
    </header>
  ) : null
}

export const HomeLineupHeader = ({ sectionTitle, sectionDescription }) => {
  return sectionTitle ? (
    <header className={cx(cardPageHeaderStyle, cardPageLineupStyle)}>
      <h2 className="sectionTitle">{sectionTitle}</h2>
      {sectionDescription ? <p className="sectionSubTitle">{sectionDescription}</p> : null}
    </header>
  ) : null
}

export const HomeTopicMixHeader = ({ sectionTitle, sectionDescription, actionCopy, action }) => {
  return sectionTitle ? (
    <header className={cx(cardPageHeaderStyle, cardPageLineupStyle, cardMixHeaderStyle)}>
      <div>
        <h2 className="sectionTitle">
          <span>{sectionTitle}</span>
        </h2>
        {sectionDescription ? <p className="sectionSubTitle">{sectionDescription}</p> : null}
      </div>
      {action ? (
        <button className="action text" onClick={action}>
          {actionCopy}
        </button>
      ) : null}
    </header>
  ) : null
}

export const HomeSimilarHeader = ({ sectionTitle, sectionDescription, closeAction = () => {} }) => {
  return sectionTitle ? (
    <header className={cx(cardPageHeaderStyle, cardPageSimilarStyle)}>
      <div>
        <h3 className="sectionTitle">{sectionTitle}</h3>
        {sectionDescription ? <p className="sectionSubTitle">{sectionDescription}</p> : null}
      </div>
      <CrossIcon className="close" data-cy="close-similar" onClick={closeAction} />
    </header>
  ) : null
}

export const HomeLineupSpacer = () => {
  return <div className={lineupSpacerStyle} />
}
