/* eslint  react/jsx-no-target-blank: 0*/
import { css, cx } from '@emotion/css'
import Link from 'next/link'
import { Pill } from 'components/pill/pill'
import { pillboxStyle } from 'components/topics-pillbox/topics-pillbox'
import { Trans } from 'next-i18next'
import dayjs from 'dayjs'
import { NewViewIcon } from '@ui/icons/NewViewIcon'

/* COMPONENTS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const headerWrapper = css`
  font-family: 'Graphik Web';
  padding: 0 40px 1em;
`

const articleTitle = css`
  font-size: 40px;
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
  padding-bottom: 0.625em;
  margin: 0;
  color: var(--color-textPrimary);
`

const articleInfo = css`
  color: var(--color-textSecondary);
  display: block;
  text-align: center;
  font-weight: 300;
  font-size: 18px;
  line-height: 1.4;
  padding-bottom: 1em;
`

const authorWrapper = css`
  position: relative;
  display: inline-block;
  &:after {
    position: relative;
    font-size: 0.5em;
    content: '•';
    margin-left: 0.3em;
    top: -0.3em;
  }
`

const domainWrapper = css`
  position: relative;
  display: inline-block;
  margin-left: 0.4em;
`

const timeWrapper = css`
  position: relative;
  display: inline-block;
  margin-left: 0.4em;
  &:before {
    position: relative;
    font-size: 0.5em;
    content: '•';
    margin-right: 0.7em;
    top: -0.3em;
  }
`

const dateWrapper = css`
  margin-top: 0.5rem;
`

const pocketInfo = css`
  text-align: center;
  font-size: 18px;

  .icon {
    margin-left: 0.5rem;
  }
`
const viewOriginal = css`
  display: block;
  font-size: 18px;
  line-height: 1;
  padding-bottom: 0.75em;
  text-decoration: none;
  color: var(--color-actionPrimary);
  &:hover {
    color: var(--color-actionPrimaryHover);
    text-decoration: underline;
  }
`

const authorNoLink = css`
  font-weight: 400;
  color: var(--color-textSecondary);
`

const tagsWrapper = css`
  padding: 0 0 var(--spacing150);

  .list {
    a {
      display: block;
      button {
        width: 100%;
      }
    }
  }
`

/* UTILITIES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function listAuthors(authors) {
  if (!authors) return
  const authorKeys = Object.keys(authors)
  return authorKeys.map((authorKey, index) => {
    const isLast = index === authorKeys.length - 1
    const current = authors[authorKey]
    return (
      <span className={authorNoLink} key={authorKey}>
        {current.name}
        {isLast ? null : ','}{' '}
      </span>
    )
  })
}

/* EXPORTED COMPONENT
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const ItemHeader = ({
  authors,
  title,
  publisher,
  externalUrl,
  tags,
  timeToRead,
  datePublished,
  viewOriginalEvent
}) => {
  const authorList = listAuthors(authors)
  const timestamp = dayjs(datePublished).format('MMMM D, YYYY')

  return (
    <header className={headerWrapper}>
      <h1 className={articleTitle}>{title}</h1>

      <div className={articleInfo}>
        {authorList?.length ? (
          <div className={authorWrapper}>
            <Trans i18nKey="reader:by">By</Trans> {authorList}
          </div>
        ) : null}
        {publisher ? <div className={domainWrapper}>{publisher}</div> : null}
        {timeToRead ? <div className={timeWrapper}>{timeToRead} min</div> : null}
        {datePublished ? <div className={dateWrapper}>{timestamp}</div> : null}
      </div>

      <div className={pocketInfo}>
        <a
          id="reader.external-link.view-original"
          data-testid="view-original"
          className={viewOriginal}
          onClick={viewOriginalEvent}
          href={externalUrl}
          target="_blank"
          rel="noopener"></a>
        {tags && (
          <div className={cx(tagsWrapper, pillboxStyle)}>
            <ul className="list">
              {tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/saves/tags/${encodeURIComponent(tag)}`}
                    id={`reader.tag.${tag}`}
                    data-testid={`reader-tag-${tag}`}>
                    <Pill>{tag}</Pill>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
