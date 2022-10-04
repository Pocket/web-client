import { useEffect, useRef } from 'react'
import { css, cx } from 'linaria'
import { SyndicatedIcon } from 'components/icons/SyndicatedIcon'

import { CardMedia } from 'components/items-media/card-media'
import { PartnerOverline } from 'components/content-partner/partner'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import ReactMarkdown from 'react-markdown'
import { breakpointSmallTablet } from 'common/constants'

const allowsMarkdownElements = ['h1', 'h2', 'h3', 'p', 'a', 'strong', 'em', 'ul', 'ol', 'li']

export const CardNext = (props) => {
  const {
    itemId,
    title,
    itemImage,
    publisher,
    authors: passedAuthors,
    excerpt,
    timeToRead,
    isSyndicated,
    isInternalItem,
    openUrl,
    externalUrl,
    fromPartner,

    // Data
    shortcutSelected,
    position,

    // UI
    cardShape,
    className,
    showExcerpt,
    showMedia,
    useMarkdown,
    partnerType,
    titleFlow = false,
    topicName = false,
    style,
    // Tracking
    onItemInView,
    onOpenOriginalUrl,
    onOpen,
    // Actions
    actionId,
    ActionMenu,
    shortcutSelect,
    selectBulk
  } = props

  const linkRef = useRef(null)
  const articleRef = useRef(null)

  // Fire when item is in view
  const [viewRef, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  useEffect(() => {
    onItemInView(inView)
  }, [inView, onItemInView])

  // Fire when item is selected by shortcut
  // This allows us to keep shortcuts in sync with tab selection and in view
  useEffect(() => {
    if (!linkRef.current) return
    const selectedAndNotActive = shortcutSelected && document.activeElement !== linkRef.current
    const notSelectedAndActive = !shortcutSelected && document.activeElement === linkRef.current

    if (notSelectedAndActive) linkRef.current.blur()
    if (selectedAndNotActive) {
      linkRef.current.focus()
      articleRef.current.scrollIntoView({ block: 'end' })
    }
  }, [shortcutSelected, linkRef])

  const handleFocus = () => {
    if (!shortcutSelected && shortcutSelect) shortcutSelect()
  }

  /**
   * Layout is defined here.
   * ----------------------------------------------------------------
   */
  const card = cx(
    cardNextStyles,
    cardShape,
    className,
    'cardNext',
    !showExcerpt && 'noExcerpt',
    !showMedia && 'noMedia'
  )

  const authors = Array.isArray(passedAuthors)
    ? passedAuthors?.filter((author) => author.name.length)
    : false

  const openInNewTab = !isInternalItem
  const linkTarget = openInNewTab ? '_blank' : undefined
  const linkRel = openInNewTab ? 'noopener noreferrer' : undefined

  return (
    <article
      style={style}
      ref={articleRef}
      className={card}
      key={itemId}
      data-cy={`article-card-${itemId}`}
      onClick={selectBulk}>
      <div className="cardWrap" ref={viewRef}>
        <Link href={openUrl}>
          <a
            ref={linkRef}
            onClick={onOpen}
            data-cy="title-link"
            tabIndex={0}
            target={linkTarget}
            rel={linkRel}>
            <CardMedia
              topicName={topicName}
              image_src={itemImage}
              title={title}
              id={itemId}
              onFocus={handleFocus}
              openInNewTab={openInNewTab}
            />

            <div className="content">
              {fromPartner ? <PartnerOverline partnerType={partnerType} /> : null}
              <h2 className={cx('title', titleFlow && 'flow', openInNewTab && 'open-external')}>
                {title}
              </h2>

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
            </div>
          </a>
        </Link>
        <footer className="footer">
          <cite className="details">
            {publisher ? (
              <>
                {externalUrl ? (
                  //eslint-disable-next-line
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
              </>
            ) : null}
            {!timeToRead && authors?.length ? (
              <div className="authors">
                {authors.map((author) => (
                  <span key={author.name}>{author.name}</span>
                ))}
              </div>
            ) : null}
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
          </cite>
          {ActionMenu ? <ActionMenu id={actionId || itemId} position={position} /> : null}
        </footer>
      </div>
    </article>
  )
}

export const cardNextStyles = css`  --card-column-span: span 4;
  --card-row-span: span 1;
  --card-padding: 1rem;
  --media-column-span: span 12;
  --content-column-span: span 12;
  --footer-column-span: span 12;
  --cite-column-span: span 8;
  --actions-column-span: span 4;
  --title-line-height: 1.25em;
  --title-margin: 1rem 0;
  --media-radius: 1rem 1rem 0 0;

  ${breakpointSmallTablet} {
    --card-column-span: span 12;
  }

  width: 100%;
  height: 100%;
  padding: 0;
  font-family: var(--fontSansSerif);
  font-weight: 400;
  position: relative;
  z-index: 0;
  grid-column: var(--card-column-span);
  grid-row: var(--card-row-span);

  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 16px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.15);
  }

  .colormode-dark & {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
    &:hover {
      cursor: pointer;
      box-shadow: 0 0 18px rgba(0, 0, 0, 0.9);
    }
  }

  .cardWrap {
    position: relative;
    height: 100%;
    width: 100%;
    text-decoration: none;
    display: block;
    padding-bottom: 4rem;

    &:hover {
      .view-original {
        opacity: 1;
        transition: opacity 300ms ease-in-out;
      }
    }

    a {
      text-decoration: none;
      &:focus {
        outline: none;
      }
      &:hover {
        color: var(--color-textPrimary);
      }
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        .media img {
          filter: brightness(0.95) saturate(0.8);
          transition: filter 300ms ease-in-out;
        }
      }
    }
  }

  .media {
    position: relative;
    grid-column: var(--media-column-span);
    border-radius: var(--media-radius);
    padding-bottom: 0;
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
    span,
    img {
      border-radius: var(--media-radius);
    }
  }

  .view-original {
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    background: rgba(26, 26, 26, 0.3);
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
    border-radius: 4px;

    ${breakpointSmallTablet} {
      display: none;
    }

    .view-original-text + .icon {
      margin-left: 0.25rem;
      margin-top: 0;
    }
  }

  .content {
    padding: 0 var(--card-padding);
    grid-column: var(--content-column-span);
    font-size: 0.875remx;
    line-height: 1.35;
    p {
      font-size: 0.875rem;
      overflow: hidden;
      text-overflow: ellipsis;
      height: calc(1.35em * 3);
      line-height: 1.35;
      margin: 0 0 1rem;
    }
  }

  .title {
    font-weight: 500;
    font-size: 1.25rem;
    line-height: var(--title-line-height);
    margin: var(--title-margin);
    max-height: calc(var(--title-line-height) * 3);
    overflow: hidden;
    text-overflow: ellipsis;
    a {
      padding-right: 0.5rem;
    }
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    grid-column: var(--footer-column-span);
    display: grid;
    grid-template-columns: auto 120px;
    align-items: center;
    padding: 0 var(--card-padding) var(--card-padding);
  }

  cite {
    font-style: normal;
    font-size: 14px;
    line-height: 20px;
    color: var(--color-textTertiary);
  }

  .publisher {
    font-weight: 500;
  }

  .authors {
    display: block;
    overflow: hidden;

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

  .actions {
  }

  &.side-by-side {
    --card-column-span: span 1;
    --card-row-span: span 1;
    --card-padding: 0.725rem;
    --media-column-span: 1;
    --content-column-span: 2;
    --footer-column-span: span 12;
    --cite-column-span: span 8;
    --actions-column-span: span 4;
    --title-line-height: 1.25em;
    --title-margin: 0 0 1rem;
    --media-radius: 16px 0 0 16px;

    margin-right: 1rem;
    padding: 0;

    .cardWrap {
      padding-bottom: 0;
    }

    .content {
      grid-row: 1;
      padding: var(--card-padding);
    }
    .title {
      font-size: 0.75rem;
      padding-bottom: 0;
    }
    .excerpt {
      display: none;
    }
    .cardWrap > a {
      display: grid;
      grid-template-columns: 40% auto;
    }
    .footer {
      padding: 0 var(--card-padding) var(--card-padding);
      grid-template-columns: 40% auto;
      cite {
        grid-column: 2;
        padding: 0 var(--card-padding);
      }
    }
  }
`