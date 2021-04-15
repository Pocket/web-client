import { useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { cx } from 'linaria'
import { SyndicatedIcon } from '@pocket/web-ui'

import { CardMedia } from 'components/media/card-media'
import { FeatureFlag } from 'connectors/feature-flags/feature-flags'
import { ItemTags } from 'components/item-tags/item-tags'
import { cardStyles } from './card-base'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
//
/** Card
 * Item card for display.
 * @param {Object} props Props passed in from React
 * @param {object} props.item  Item data
 * @param {boolean} props.showExcerpt  Show excerpt or not
 * @param {string} props.itemType  What kind of item (discover, mylist, message, etc.)
 * @param {string} props.cardShape  What shape should the card take (block, wide, list)
 * @param {boolean} props.bulkEdit  Are we in bulk edit?
 * @param {boolean} props.bulkSelected  Is this particular item selected?
 * @param {integer} props.position  Where does this sit in the collection
 */
export const Card = (props) => {
  const {
    item,
    showExcerpt,
    showMedia,
    hiddenActions,
    cardShape,
    bulkEdit,
    bulkSelected,
    position,
    className,
    selectBulk,
    onItemInView,
    onOpenOriginalUrl,
    shortcutSelected,
    shortcutSelect,
    onOpen,
    openUrl,
    ActionMenu
  } = props

  const {
    item_id: id,
    tags,
    title,
    thumbnail,
    publisher,
    excerpt,
    read_time,
    openExternal,
    syndicated,
    original_url
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
    if (!shortcutSelected) shortcutSelect()
  }

  if (!item) return null

  /**
   * Layout is defined here.
   * ----------------------------------------------------------------
   */
  const card = cx(
    cardStyles,
    cardShape,
    hiddenActions && 'hiddenActions',
    !showExcerpt && 'noExcerpt',
    !showMedia && 'noMedia',
    bulkEdit && 'bulkEdit',
    (bulkSelected || shortcutSelected) && 'selected',
    className
  )

  const showTags = cardShape === 'detail'

  return (
    <article
      ref={articleRef}
      className={card}
      key={id}
      data-id={`article-card-${id}`}
      onClick={selectBulk}>
      <div className="selectedBack" />

      <FeatureFlag flag="item_id_overlay" dev={true}>
        <span className="idOverlay">{id}</span>
      </FeatureFlag>
      <div className="cardWrap" ref={viewRef}>
        {showMedia ? (
          <CardMedia
            image_src={thumbnail}
            title={title}
            id={id}
            openUrl={openUrl}
            onOpen={onOpen}
            openExternal={openExternal}
          />
        ) : null}
        <div className="content">
          <h2 className="title">
            {openUrl ? (
              <Link href={openUrl}>
                <a
                  ref={linkRef}
                  onClick={onOpen}
                  target={openExternal ? '_blank' : undefined}
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
            {publisher ? (
              <a
                className="publisher"
                href={original_url}
                target="_blank"
                onClick={onOpenOriginalUrl}
                tabIndex={0}>
                {publisher}
              </a>
            ) : null}
            {read_time ? <span className="readtime"> · {read_time} min</span> : null}
            {syndicated ? (
              <span className="syndicated">
                <SyndicatedIcon />
              </span>
            ) : null}
          </cite>

          {showExcerpt ? <p className="excerpt">{excerpt}</p> : null}
        </div>
      </div>
      <footer className="footer">
        {showTags ? <ItemTags tags={tags} /> : null}
        {ActionMenu ? <ActionMenu id={id} position={position} /> : null}
      </footer>
    </article>
  )
}

Card.propTypes = {
  /**
   Item data to populate the card content
  */
  item: PropTypes.object,
  showExcerpt: PropTypes.bool,
  cardShape: PropTypes.oneOf(['block', 'grid', 'wide', 'list', 'detail', 'discover']),
  hiddenActions: PropTypes.bool,
  bulkEdit: PropTypes.bool,
  bulkSelected: PropTypes.bool,
  position: PropTypes.number,
  className: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  impressionAction: PropTypes.func,
  engagementAction: PropTypes.func,
  saveAction: PropTypes.func,
  reportAction: PropTypes.func,
  unSaveAction: PropTypes.func,
  openAction: PropTypes.func,
  itemBulkSelect: PropTypes.func,
  itemBulkDeSelect: PropTypes.func
}

Card.defaultProps = {
  cardShape: 'block',
  showExcerpt: false,
  showMedia: true,
  hiddenActions: false,
  engagementAction: () => {},
  saveAction: () => {},
  reportAction: () => {},
  unSaveAction: () => {},
  openAction: () => {},
  onItemInView: () => {},
  itemBulkSelect: () => {},
  itemBulkDeSelect: () => {}
}
