import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { cx } from '@emotion/css'
import { SyndicatedIcon } from '@ui/icons/SyndicatedIcon'

import { CardMedia } from 'components/items-media/card-media'
import { ItemTags } from 'components/item-tags/item-tags'
import { PartnerOverline } from 'components/content-partner/partner'
import { cardStyles } from './card-base'
import Link from 'next/link'
import { useIntersectionObserver } from 'common/utilities/intersection/intersection'
import ReactMarkdown from 'react-markdown'
import { NewViewIcon } from '@ui/icons/NewViewIcon'

/** Card
 * Item card for display.
 * @param itemId
 * @param tags
 * @param title
 * @param itemImage
 * @param publisher
 * @param authors
 * @param excerpt
 * @param readTime
 * @param isSyndicated
 * @param openUrl
 * @param fromPartner

 * Data
 * @param {boolean} props.bulkEdit  Are we in bulk edit?
 * @param {boolean} props.bulkSelected  Is this particular item selected?
 * @param {boolean} props.shortcutSelected Is this particular item selected via shortcut
 * @param {function} props.shortcutSelect Function to call when getting focus without select
 * @param {integer} props.position  Where does this sit in the collection
 * @param {string} props.openUrl What is the url we will use when opening item
 * UI
 * @param {string} props.cardShape  What shape should the card take (block, wide, list)
 * @param {string} props.className Any classname passed down
 * @param {boolean} props.showExcerpt  Show excerpt or not
 * @param {boolean} props.showMedia Show image or not
 * @param {boolean} props.hiddenActions Hide actions until hover or not
 * @param {function} props.itemNoImage Action to fire if an item has no image
 * @param {string} props.partnerType PARTNERED or SPONSORED
 * Tracking
 * @param {function} props.onItemInView Action to fire when item is in view
 * @param {function} props.onOpen Action to fire when an item is opened
 * @param {function} props.onOpenOriginalUrl Action to fire when user opens the original url
 * Actions
 * @param {component} props.ActionMenu A connected actions component

 */
export const Card = (props) => {
  const {
    itemId,
    tags,
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
    bulkEdit,
    bulkSelected,
    shortcutSelected,
    bulkIsCurrent,

    position,
    // UI
    cardShape = 'grid',
    showExcerpt = false,
    showMedia = true,
    hiddenActions = false,
    className,
    onImageFail,
    useMarkdown,
    partnerType,
    titleFlow = false,
    topicName = false,
    style,
    // Tracking
    onItemInView = () => {},
    onOpenOriginalUrl = () => {},
    onOpen = () => {},
    // Actions
    actionId,
    ActionMenu,
    shortcutSelect,
    selectBulk
  } = props

  const linkRef = useRef(null)
  const articleRef = useRef(null)
  const viewRef = useRef(null)

  // Fire when item is in view
  const entry = useIntersectionObserver(viewRef, { freezeOnceVisible: true, threshold: 0.5 })
  if (!!entry?.isIntersecting) onItemInView(true)

  // Fire when item is selected by shortcut
  // This allows us to keep shortcuts in sync with tab selection and in view
  useEffect(() => {
    if (!linkRef.current) return () => {}
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
    cardStyles,
    cardShape,
    className,
    hiddenActions && !bulkEdit && 'hiddenActions',
    !showExcerpt && 'noExcerpt',
    !showMedia && 'noMedia',
    bulkIsCurrent && 'bulkCurrent',
    bulkEdit && 'bulkEdit',
    (bulkSelected || shortcutSelected) && 'selected'
  )

  const showTags = cardShape === 'detail'
  const authors = Array.isArray(passedAuthors)
    ? passedAuthors?.filter((author) => author.name.length)
    : false

  const openInNewTab = !isInternalItem
  const linkTarget = openInNewTab ? '_blank' : undefined
  const linkRel = openInNewTab ? 'noopener' : undefined

  return (
    <article
      style={style}
      ref={articleRef}
      className={card}
      key={itemId}
      data-testid={`article-card-${itemId}`}
      onClick={selectBulk}>
      <div className="selectedBack" />

      <div className="cardWrap" ref={viewRef}>
        {showMedia ? (
          <CardMedia
            topicName={topicName}
            image_src={itemImage}
            title={title}
            id={itemId}
            openUrl={openUrl}
            onOpen={onOpen}
            onImageFail={onImageFail}
            onFocus={handleFocus}
            openInNewTab={openInNewTab}
          />
        ) : null}
        <div className="content">
          {fromPartner ? <PartnerOverline partnerType={partnerType} /> : null}
          <h2 className={cx('title', titleFlow && 'flow', openInNewTab && 'open-external')}>
            {openUrl ? (
              <>
                <Link
                  href={openUrl}
                  ref={linkRef}
                  onClick={onOpen}
                  data-testid="title-link"
                  tabIndex={0}
                  target={linkTarget}
                  rel={linkRel}
                  onFocus={handleFocus}>
                  {title}
                </Link>
                {openInNewTab ? (
                  <NewViewIcon className="mobile-view-original" data-testid="view-original-icon" />
                ) : null}
              </>
            ) : (
              title
            )}
          </h2>

          <cite className="details">
            {authors?.length ? (
              <div className="authors">
                {authors.map((author) => (
                  <span key={author.name}>{author.name}</span>
                ))}
              </div>
            ) : null}
            {publisher ? (
              <>
                {externalUrl ? (
                  //eslint-disable-next-line
                  <a
                    className="publisher"
                    href={externalUrl}
                    onClick={onOpenOriginalUrl}
                    data-testid="publisher-link"
                    tabIndex={0}
                    target="_blank"
                    rel="noopener">
                    {publisher}
                  </a>
                ) : (
                  <span className="publisher">{publisher}</span>
                )}
              </>
            ) : null}
            {timeToRead ? (
              <span className="readtime" data-testid="read-time">
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

          {showExcerpt ? (
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
          ) : null}
        </div>
      </div>
      <footer className="footer">
        {showTags ? <ItemTags tags={tags} /> : null}
        {ActionMenu ? <ActionMenu id={actionId || itemId} position={position} /> : null}
      </footer>
    </article>
  )
}

Card.propTypes = {
  // Item Data
  itemId: PropTypes.string,
  tags: PropTypes.array,
  title: PropTypes.string,
  itemImage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  publisher: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  authors: PropTypes.array,
  excerpt: PropTypes.string,
  timeToRead: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  isSyndicated: PropTypes.bool,
  externalUrl: PropTypes.string,
  fromPartner: PropTypes.bool,
  bulkEdit: PropTypes.bool,
  bulkSelected: PropTypes.bool,
  shortcutSelected: PropTypes.bool,
  openUrl: PropTypes.string,
  // UI
  cardShape: PropTypes.oneOf([
    'grid',
    'block',
    'display',
    'wide',
    'full',
    'detail',
    'list',
    'flex'
  ]),
  className: PropTypes.string,
  showExcerpt: PropTypes.bool,
  showMedia: PropTypes.bool,
  hiddenActions: PropTypes.bool,
  position: PropTypes.number,
  partnerType: PropTypes.string,
  // Tracking
  onItemInView: PropTypes.func,
  onOpen: PropTypes.func,
  onOpenOriginalUrl: PropTypes.func,
  // Actions
  ActionMenu: PropTypes.func,
  shortcutSelect: PropTypes.func,
  bulkSelect: PropTypes.func
}
