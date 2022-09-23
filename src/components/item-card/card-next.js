import { useEffect, useRef } from 'react'
import { cx } from 'linaria'
import { SyndicatedIcon } from 'components/icons/SyndicatedIcon'

import { CardMedia } from 'components/items-media/card-media'
import { PartnerOverline } from 'components/content-partner/partner'
import { cardNextStyles } from './card-base'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import ReactMarkdown from 'react-markdown'
import { NewViewIcon } from 'components/icons/NewViewIcon'

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
    onImageFail,
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
        <a href={openUrl}>
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
              {openUrl ? (
                <>
                  <Link href={openUrl}>
                    <a
                      ref={linkRef}
                      onClick={onOpen}
                      data-cy="title-link"
                      tabIndex={0}
                      target={linkTarget}
                      rel={linkRel}
                      onFocus={handleFocus}>
                      {title}
                    </a>
                  </Link>
                </>
              ) : (
                title
              )}
            </h2>

            <div className="excerpt">
              {useMarkdown ? (
                <ReactMarkdown
                  skipHtml={true}
                  unwrapDisallowed={true}
                  className="markdown"
                  allowedElements={['h1', 'h2', 'h3', 'p', 'a', 'strong', 'em', 'ul', 'ol', 'li']}>
                  {excerpt}
                </ReactMarkdown>
              ) : (
                <p>{excerpt}</p>
              )}
            </div>
          </div>
        </a>
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
