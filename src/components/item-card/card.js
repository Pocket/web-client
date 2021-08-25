import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { cx } from 'linaria'
import { SyndicatedIcon } from '@pocket/web-ui'

import { CardMedia } from 'components/items-media/card-media'
import { FeatureFlag } from 'connectors/feature-flags/feature-flags'
import { ItemTags } from 'components/item-tags/item-tags'
import { PartnerOverline } from 'components/content-partner/partner'
import { cardStyles } from './card-base'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import ReactMarkdown from 'react-markdown'

/** Card
 * Item card for display.
 * @param {Object} props Props passed in from React
 * Data
 * @param {object} props.item  Item data
 * @param {boolean} props.bulkEdit  Are we in bulk edit?
 * @param {boolean} props.bulkSelected  Is this particular item selected?
 * @param {boolean} props.shortcutSelected Is this particular item selected via shortcut
 * @param {function} props.shortcutSelect Function to call when getting focus without select
 * @param {integer} props.position  Where does this sit in the collection
 * @param {string} props.openUrl What is the url we will use when opening item
 * UI
 * @param {string} props.cardShape  What shape should the card take (block, wide, list)
 * @param {string} props.className Any classnames passed down
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
    item,
    // Data
    bulkEdit,
    bulkSelected,
    shortcutSelected,
    openUrl,
    position,
    // UI
    cardShape,
    className,
    showExcerpt,
    showMedia,
    hiddenActions,
    onImageFail,
    useMarkdown,
    partnerType,
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

  const {
    item_id: id,
    tags,
    title,
    thumbnail,
    publisher,
    authors: passedAuthors,
    excerpt,
    read_time,
    syndicated,
    open_url,
    noImage,
    fromPartner
  } = item

  const linkRef = useRef(null)
  const articleRef = useRef(null)

  // Fire when item is in view
  const [viewRef, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  useEffect(() => onItemInView(inView), [inView, onItemInView])

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

  if (!item) return null

  const itemImage = noImage ? '' : thumbnail
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
    bulkEdit && 'bulkEdit',
    (bulkSelected || shortcutSelected) && 'selected'
  )

  const showTags = cardShape === 'detail'
  const authors = Array.isArray(passedAuthors)
    ? passedAuthors?.filter((author) => author.name.length)
    : false

  return (
    <article
      ref={articleRef}
      className={card}
      key={id}
      data-cy={`article-card-${id}`}
      onClick={selectBulk}>
      <div className="selectedBack" />

      <FeatureFlag flag="item_id_overlay" dev={true}>
        <span className="idOverlay">{id}</span>
      </FeatureFlag>

      <div className="cardWrap" ref={viewRef}>
        {showMedia ? (
          <CardMedia
            image_src={itemImage}
            title={title}
            id={id}
            openUrl={openUrl}
            onOpen={onOpen}
            onImageFail={onImageFail}
            onFocus={handleFocus}
          />
        ) : null}
        <div className="content">
          { fromPartner ? <PartnerOverline partnerType={partnerType} /> : null }
          <h2 className="title">
            {openUrl ? (
              <Link href={openUrl}>
                <a
                  ref={linkRef}
                  onClick={onOpen}
                  data-cy="title-link"
                  tabIndex={0}
                  onFocus={handleFocus}>
                  {title}
                </a>
              </Link>
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
              //eslint-disable-next-line
              <a
                className="publisher"
                href={open_url}
                onClick={onOpenOriginalUrl}
                data-cy="publisher-link"
                tabIndex={0}>
                {publisher}
              </a>
            ) : null}
            {read_time ? (
              <span className="readtime" data-cy="read-time">
                {' '}
                · {read_time} min
              </span>
            ) : null}
            {syndicated ? (
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
        {ActionMenu ? <ActionMenu id={actionId || id} position={position} /> : null}
      </footer>
    </article>
  )
}

Card.propTypes = {
  // Data
  item: PropTypes.object,
  bulkEdit: PropTypes.bool,
  bulkSelected: PropTypes.bool,
  shortcutSelected: PropTypes.bool,
  openUrl: PropTypes.string,
  // UI
  cardShape: PropTypes.oneOf(['grid', 'block', 'display', 'wide', 'full', 'detail', 'list']),
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

Card.defaultProps = {
  cardShape: 'grid',
  showExcerpt: false,
  showMedia: true,
  hiddenActions: false,
  setNoImage: () => {},
  onItemInView: () => {},
  onOpen: () => {},
  onOpenOriginalUrl: () => {},
  bulkSelect: () => {}
}
