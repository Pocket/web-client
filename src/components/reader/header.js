/* eslint  react/jsx-no-target-blank: 0*/
import { css } from 'linaria'
import { TagList } from 'components/tagging/tag.list'
import {
  domainForUrl,
  urlWithPocketRedirect,
  getTimeToRead
} from 'common/utilities'

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
  line-height: 1;
  padding-bottom: 1em;
`

const byWrapper = css`
  display: inline-block;
`

const authorWrapper = css`
  position: relative;
  display: inline-block;
  &:after {
    position: relative;
    font-size: 0.5em;
    content: '•';
    margin-left: 0.7em;
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
const pocketInfo = css`
  text-align: center;
  font-size: 18px;
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
`

/* UTILITIES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function listAuthors(authors) {
  if (!authors) return
  return Object.keys(authors).map((authorKey) => {
    const current = authors[authorKey]
    return (
      <span className={authorNoLink} key={authorKey}>
        {current.name}
      </span>
    )
  })
}

/* EXPORTED COMPONENT
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const ItemHeader = ({
  authors,
  given_title,
  resolved_title,
  resolved_url,
  given_url,
  tags,
  has_video,
  word_count,
  videos
}) => {
  const timeEstimateProps = {
    word_count,
    has_video,
    videos
  }

  const authorList = listAuthors(authors)
  const domain = domainForUrl(resolved_url)
  const timeDisplay = getTimeToRead(timeEstimateProps, true)

  return (
    <header className={headerWrapper}>
      <h1 className={articleTitle}>{resolved_title || given_title}</h1>

      <div className={articleInfo}>
        {authorList || domain ? <div className={byWrapper}>By </div> : null}{' '}
        {/*"reader.header.by"*/}
        {authorList ? <div className={authorWrapper}>{authorList}</div> : null}
        {domain ? <div className={domainWrapper}>{domain}</div> : null}
        {timeDisplay ? <div className={timeWrapper}>{timeDisplay}</div> : null}
      </div>

      <div className={pocketInfo}>
        <a
          className={viewOriginal}
          href={urlWithPocketRedirect(given_url)}
          target="_blank">
          View Original {/*"reader.header.viewOriginal"*/}
        </a>
        {tags && (
          <div className={tagsWrapper}>
            <TagList tags={tags} noWrap="true" />
          </div>
        )}
      </div>
    </header>
  )
}
