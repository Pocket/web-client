import { css, cx } from 'linaria'
import { useTranslation } from 'next-i18next'
import { CrossIcon } from 'components/icons/CrossIcon'
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

const cardPageSectionStyle = css`
  margin-bottom: 0;
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
