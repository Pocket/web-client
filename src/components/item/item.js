import { css, cx } from 'linaria'
import { SyndicatedIcon } from 'components/icons/SyndicatedIcon'

import { CardMedia } from 'components/items-media/card-media'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { breakpointSmallTablet } from 'common/constants'
import { FavoriteFilledIcon } from 'components/icons/FavoriteFilledIcon'
import { ItemTags } from 'components/item-tags/item-tags'
import { useTranslation } from 'next-i18next'

const allowsMarkdownElements = ['h1', 'h2', 'h3', 'p', 'a', 'strong', 'em', 'ul', 'ol', 'li']

export const Item = (props) => {
  const {
    itemId,
    title,
    itemImage,
    publisher,
    publisherLogo,
    authors,
    excerpt,
    timeToRead,
    isFavorite,
    isSyndicated,
    isInternalItem,
    url,
    fromPartner,
    topicName,
    tags,

    // UI
    className,
    useMarkdown,
    partnerType,
    clamp,

    //Positioning
    style,

    // Actions
    Actions,
    ActionsSecondary,

    // Tracking
    onItemInView,
    onOpenOriginalUrl,
    onOpen
  } = props

  /**
   * Layout is defined here.
   * ----------------------------------------------------------------
   */
  const itemClassName = cx(itemStyles, clamp && 'clamped', className)
  const openInNewTab = !isInternalItem
  const linkTarget = openInNewTab ? '_blank' : undefined
  const linkRel = openInNewTab ? 'noopener noreferrer' : undefined

  return (
    <article style={style} className={itemClassName} key={itemId} data-cy="article-card">
      <Link href={url}>
        <a
          onClick={onOpen}
          className="media-block"
          data-cy="content-link"
          target={linkTarget}
          rel={linkRel}>
          <CardMedia
            topicName={topicName}
            image_src={itemImage}
            title={title}
            id={itemId}
            openInNewTab={openInNewTab}
          />
        </a>
      </Link>
      <Link href={url}>
        <a
          onClick={onOpen}
          className="content-block"
          data-cy="content-block"
          target={linkTarget}
          rel={linkRel}>
          <div className="content">
            {fromPartner ? <PartnerOverline partnerType={partnerType} /> : null}
            <h2 className={cx('title', openInNewTab && 'open-external')}>{title}</h2>
            <Excerpt useMarkdown={useMarkdown} excerpt={excerpt} />
          </div>
        </a>
      </Link>

      <footer className="footer">
        {tags.length ? <ItemTags className="itemTags" tags={tags} /> : null}
        <cite className="details">
          <Publisher
            publisherLogo={publisherLogo}
            publisher={publisher}
            externalUrl={url}
            onOpenOriginalUrl={onOpenOriginalUrl}
          />
          {timeToRead ? (
            <span className="readtime" data-cy="read-time">
              {' '}
              · {timeToRead} min
            </span>
          ) : null}

          {isSyndicated ? (
            <span className="syndicated">
              <SyndicatedIcon />
            </span>
          ) : null}

          {authors?.length ? (
            <div className="authors">
              {authors.map((author) => (
                <span key={author.name}>{author.name}</span>
              ))}
            </div>
          ) : null}
        </cite>
        {Actions ? <Actions /> : null}
      </footer>

      {ActionsSecondary ? <ActionsSecondary /> : null}

      {isFavorite ? (
        <div className="favoriteIndicator">
          <FavoriteFilledIcon />
        </div>
      ) : null}

      {publisherLogo && publisher !== 'Pocket' ? (
        <img src={publisherLogo} alt={publisher} className="publisherLogo" />
      ) : null}
    </article>
  )
}

const Excerpt = ({ useMarkdown, excerpt }) => {
  return (
    <div className="excerpt">
      {useMarkdown ? (
        <ReactMarkdown
          skipHtml={true}
          unwrapDisallowed={true}
          className="markdown"
          allowedElements={allowsMarkdownElements}>
          {excerpt}
        </ReactMarkdown>
      ) : (
        <p>{excerpt}</p>
      )}
    </div>
  )
}

const Publisher = ({ publisher, externalUrl, onOpenOriginalUrl }) => {
  if (!publisher) return null
  if (externalUrl)
    return (
      <a
        className="publisher"
        href={externalUrl}
        onClick={onOpenOriginalUrl}
        data-cy="publisher-link"
        tabIndex={0}
        target="_blank"
        rel="noopener noreferrer">
        {publisher}
      </a>
    )
  return <span className="publisher">{publisher}</span>
}

function PartnerOverline({ partnerType }) {
  const { t } = useTranslation()

  if (!partnerType) return null

  const partnerTypes = {
    PARTNERED: t('partner:partner-overline', 'From our partners'),
    SPONSORED: t('partner:sponsor-overline', 'Sponsored')
  }
  const overline = partnerTypes[partnerType] || ''

  return <div className="overline">{overline}</div>
}

const itemStyles = css`
  --card-column-span: span 4;
  --card-row-span: span 1;
  --card-padding: 1rem;
  --media-column-span: span 2;
  --content-column-span: span 2;
  --footer-column-span: span 12;
  --cite-column-span: span 8;
  --actions-column-span: span 4;
  --title-line-height: 1.25em;
  --title-margin: 1rem 0;
  --media-radius: 1rem 1rem 0 0;
  --card-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  --card-hover-shadow: 0 0 18px rgba(0, 0, 0, 0.25);
  --card-border-radius: 1rem;
  --card-transition: all 150ms ease-in;

  --title-size: 1.25rem;
  --title-lines: 3;

  --excerpt-size: 0.875rem;
  --excerpt-margin: 0 0 1rem;
  --excerpt-lines: 3;
  --excerpt-line-height: 1.35em;

  .colormode-dark & {
    --card-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
    --card-hover-shadow: 0 0 18px rgba(0, 0, 0, 0.9);
  }

  ${breakpointSmallTablet} {
    --card-column-span: span 12;
  }

  // Container card styles
  font-family: var(--fontSansSerif);
  font-weight: 400;
  position: relative;
  z-index: 0;
  grid-column: var(--card-column-span);

  background-color: var(--color-canvas);
  box-shadow: var(--card-shadow);
  border-radius: var(--card-border-radius);
  transition: var(--card-transition);

  //Inner grid
  .content-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  // What happens when we hover over the main card
  &:hover {
    cursor: pointer;
    box-shadow: var(--card-hover-shadow);
  }

  & > a {
    text-decoration: none;
    &:focus {
      outline: none;
    }
    &:hover {
      color: var(--color-textPrimary);
    }
  }

  // What does the main image look like?
  .media {
    position: relative;
    grid-column: var(--media-column-span);
    border-radius: var(--media-radius);
    padding-bottom: 0; // This is an override ... we should remove this from the media component
    span,
    img {
      border-radius: var(--media-radius);
    }
  }

  .topic-name {
    background: rgba(26, 26, 26, 0.8);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25rem;
    border-radius: 8px;
    color: var(--color-white100);
    position: absolute;
    padding: 0.25rem 0.825rem;
    z-index: 10;
    bottom: 2rem;
    left: 1rem;
    text-transform: capitalize;
  }

  // What does the main content (title/excerpt) look like?
  .content {
    padding: 0 var(--card-padding);
    grid-column: var(--content-column-span);
  }

  .overline {
    position: absolute;
    background-color: var(--color-canvas);
    color: var(--color-textSecondary);
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 0.014em;
    line-height: 1.25;
    transform: translate(-1rem, -100%);
    padding: 0.5rem 1rem 1rem 1rem;
    border-radius: 0 1rem 0 0;
  }

  .title {
    font-weight: 500;
    font-size: var(--title-size);
    margin: var(--title-margin);
    line-height: var(--title-line-height);
  }

  &.clamped .title {
    max-height: calc(var(--title-line-height) * var(--title-lines));
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: var(--title-lines);
    -webkit-box-orient: vertical;
  }

  .excerpt {
    p {
      font-size: var(--excerpt-size);
      overflow: hidden;
      text-overflow: ellipsis;
      margin: var(--excerpt-margin);
      line-height: var(--excerpt-line-height);
    }
  }

  &.clamped .excerpt p {
    max-height: calc(var(--excerpt-line-height) * var(--excerpt-lines));
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: var(--excerpt-lines);
    -webkit-box-orient: vertical;
  }

  .footer {
    padding: 0 var(--card-padding) var(--card-padding);
    display: grid;
    grid-template-columns: auto 120px;
  }

  cite.details {
    font-style: normal;
    font-size: 14px;
    line-height: 20px;
    color: var(--color-textTertiary);
  }

  .publisherLogo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
  }

  .publisher {
    font-weight: 500;
    overflow: hidden;
    text-decoration: none;
    font-size: 0.875rem;
  }

  .syndicated .icon {
    margin: -0.25rem 0 0 0.25rem;
    font-size: 1rem;
  }

  .authors {
    display: block;
    overflow: hidden;
    max-height: 1.25em;
    text-overflow: ellipsis;
    overflow-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    span:after {
      content: ',';
      display: inline-block;
      padding: 0 0.5rem 0 0;
    }
    span:last-of-type:after {
      content: '';
      display: none;
      padding: 0;
    }
  }

  .favoriteIndicator {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: var(--color-canvas);
    color: var(--color-amber);
    border-radius: 16px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      margin-top: 0;
    }
  }

  .actions {
    padding: 0;
    justify-content: flex-end;
  }

  .overflow-container {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    .overflow {
      transform: translate(-10%, 10%);
      box-shadow: var(--card-shadow);
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
      background-color: var(--color-canvas);
      border-radius: 1rem;
      color: var(--color-textTertiary);
      font-size: 24px;
      width: 32px;
      height: 32px;
      .icon {
        margin: 0;
      }
    }
  }
  &:hover .overflow-container {
    display: block;
  }

  .tags {
    padding: 0 0 var(--card-padding) 0;
    display: flex;
    grid-column: 1/-1;
    flex-flow: wrap;
    span {
      margin: 0 0.5rem 0.5rem 0;
      a {
        text-decoration: none;
        cursor: pointer;
        &:hover {
          background-color: var(--color-checkboxBackgroundSelected);
        }
      }
    }
  }
`
