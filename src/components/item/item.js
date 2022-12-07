import { css, cx } from 'linaria'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import ReactMarkdown from 'react-markdown'
import { SyndicatedIcon } from 'components/icons/SyndicatedIcon'
import { NewViewIcon } from 'components/icons/NewViewIcon'
import { CardMedia } from 'components/items-media/card-media'
import { ItemTags } from 'components/item-tags/item-tags'
import { breakpointSmallTablet } from 'common/constants'

const allowsMarkdownElements = ['h1', 'h2', 'h3', 'p', 'a', 'strong', 'em', 'ul', 'ol', 'li']

export const Item = (props) => {
  const {
    itemId,
    title,
    itemImage,
    publisher,
    publisherLogo,
    excerpt,
    timeToRead,
    isFavorite,
    isArchive,
    isPremium,
    isSyndicated,
    isInternalItem,
    saveStatus,
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
          rel={linkRel}
          aria-label={`Open item: ${title}`}>
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
            <h2 className={cx('title', openInNewTab && 'open-external')}>
              {title}{' '}
              {openInNewTab ? (
                <NewViewIcon className="mobile-view-original" data-cy="view-original-icon" />
              ) : null}
            </h2>
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
            isSyndicated={isSyndicated}
          />
          {timeToRead ? (
            <div className="readtime" data-cy="read-time">
              {timeToRead} min
            </div>
          ) : null}
        </cite>

        <div className="footerActions">
          {Actions ? (
            <Actions
              isFavorite={isFavorite}
              isArchive={isArchive}
              isPremium={isPremium}
              saveStatus={saveStatus}
            />
          ) : null}
        </div>
      </footer>

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

const Publisher = ({ publisher, externalUrl, onOpenOriginalUrl, isSyndicated }) => {
  if (!publisher) return null
  return (
    <>
      {externalUrl ? (
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
      ) : (
        <span className="publisher">{publisher}</span>
      )}
      {isSyndicated ? (
        <span className="syndicated">
          <SyndicatedIcon />
        </span>
      ) : null}
    </>
  )
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
  // This is can be used in layouts
  --card-column: span 4;
  --card-row: span 1;

  // We lay out the card in it's own grid (independent of containing layout)
  --card-column-template: 1fr;
  --card-column-gap: 0;

  // Where does the media sit?  Stacked default
  --media-column: initial;
  --media-row: initial;

  // Where does the content sit?  Stacked default
  --content-column: initial;
  --content-row: initial;

  // Where does the footer sit?  Stacked default
  --footer-column: initial;
  --footer-column-template: auto 50%;
  --footer-column-gap: 1rem;

  // Generally these are consistent styles
  --card-padding: 1rem;

  --media-radius: 1rem 1rem 0 0;
  --media-margin: 0 0 0 0;

  --card-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  --card-hover-shadow: 0 0 18px rgba(0, 0, 0, 0.25);
  --card-border-radius: 1rem;
  --card-transition: all 150ms ease-in;

  --overline-display: block;

  --title-line-height: 1.25em;
  --title-margin: 1rem 0;
  --title-size: 1.25rem;
  --title-lines: 3;

  --excerpt-display: initial;
  --excerpt-size: 0.875rem;
  --excerpt-margin: 0 0 1rem;
  --excerpt-lines: 3;
  --excerpt-line-height: 1.35em;

  --details-size: 0.875rem;
  --details-column: initial;
  --details-row: initial;

  --logo-display: block;
  --overflow-transform: translate(-10%, 10%);

  .colormode-dark & {
    --card-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
    --card-hover-shadow: 0 0 18px rgba(0, 0, 0, 0.9);
  }

  // Container card styles
  font-family: var(--fontSansSerif);
  font-weight: 400;
  position: relative;
  z-index: 0;
  grid-column: var(--card-column);

  background-color: var(--color-canvas);
  box-shadow: var(--card-shadow);
  border-radius: var(--card-border-radius);
  transition: var(--card-transition);

  //Inner grid
  display: grid;
  grid-template-columns: var(--card-column-template);
  grid-column-gap: var(--card-column-gap);

  // What happens when we hover over the main card
  &:hover {
    box-shadow: var(--card-hover-shadow);
    .view-original {
      opacity: 1;
      transition: opacity 300ms ease-in-out;
    }
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
  .media-block {
    position: relative;
    grid-column: var(--media-column);
    grid-row: var(--media-row);
    border-radius: var(--media-radius);
    .media {
      margin: var(--media-margin);
      padding-bottom: 0; // This is an overide and should be removed from the media element
    }
    span,
    img {
      border-radius: var(--media-radius);
    }
  }

  .view-original {
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    background: rgba(26, 26, 26, 0.7);
    color: var(--color-white100);
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    position: absolute;
    z-index: 10;
    padding: 0.25rem 0.825rem;

    ${breakpointSmallTablet} {
      display: none;
    }

    .view-original-text + .icon {
      margin-left: 0.25rem;
      margin-top: 0;
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
  .content-block {
    display: block;
    padding: 0 var(--card-padding);
    grid-column: var(--content-column);
  }

  .overline {
    display: var(--overline-display);
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

    &.open-external {
      a {
        margin-right: 0;
        ${breakpointSmallTablet} {
          margin-right: 0.5rem;
        }
      }
      .mobile-view-original {
        display: none;
        ${breakpointSmallTablet} {
          display: inline-block;
        }
      }
    }
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
    display: var(--excerpt-display);
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
    grid-column: var(--footer-column);
    grid-template-columns: var(--footer-column-template);
    grid-column-gap: var(--footer-column-gap);
  }

  cite.details {
    grid-column: var(--details-column);
    grid-row: var(--details-row);
    font-style: normal;
    font-size: var(--details-size);
    line-height: 1.25;
    color: var(--color-textTertiary);
  }

  .publisherLogo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    display: var(--logo-display);
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

  // This view is very flawed.  It seems built to address aribrary existing layout
  // but I tried to get a consistent information hierarchy into it
  &.side-by-side {
    --card-column: span 4;
    --card-row: span 1;

    // We lay out the card in it's own grid (independent of containing layout)
    --card-column-template: 120px auto;
    --card-column-gap: 0.5rem;

    // Where does the media sit?  Stacked default
    --media-column: 1;
    --media-row: span 2;

    // Where does the content sit?  Stacked default
    --content-column: 2/-1;
    --content-row: initial;

    // Where does the footer sit?  Stacked default
    --footer-column: 1/-1;
    --footer-column-template: auto 32px;

    --card-padding: 0.875rem;

    --overline-display: none;

    --title-size: 1rem;
    --title-margin: 0.875rem 0 0.5rem;

    --media-radius: 0.5rem;
    --media-margin: 0.875rem 0 0.875rem 0.875rem;

    --excerpt-display: none;

    --logo-display: none;
    --overflow-transform: translate(15%, -15%);
  }
`
