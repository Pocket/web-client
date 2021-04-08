import React from 'react'
import PropTypes from 'prop-types'
import { cx } from 'linaria'
import { SyndicatedIcon } from '@pocket/web-ui'

import { CardMedia } from 'components/media/card-media'
import { FeatureFlag } from 'connectors/feature-flags/feature-flags'
import { ItemTags } from 'components/item-tags/item-tags'
import { cardStyles } from './card-base'
import { cardBlock } from './card-base'
import { cardWide } from './card-base'
import { cardList } from './card-base'
import { cardDetail } from './card-base'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

/** Card
 * Item card for display.
 * @param {Object} props Props passed in from React
 * @param {object} props.item  Item data
 * @param {boolean} props.showExcerpt  Show excerpt or not
 * @param {string} props.itemType  What kind of item (discover, mylist, message, etc.)
 * @param {string} props.cardShape  What shape should the card take (block, wide, list)
 * @param {object} props.actions  Passed in actions NOTE: may be moved
 * @param {boolean} props.bulkEdit  Are we in bulk edit?
 * @param {boolean} props.bulkSelected  Is this particular item selected?
 * @param {integer} props.position  Where does this sit in the collection
 */
export const Card = ({
  item,
  showExcerpt,
  showMedia = true,
  itemType,
  cardShape,
  bulkEdit,
  bulkSelected,
  position,
  className,
  impressionAction,
  itemOriginalOpen,
  selectBulk,
  onOpen,
  openUrl,
  ActionMenu
}) => {
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

  // Fire item impression
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    if (inView) impressionAction(item, position, id)
  }, [inView, id, impressionAction, item, position])

  if (!item) return null

  /**
   * Layout is defined here.
   * ----------------------------------------------------------------
   */
  const card = cx(
    cardStyles,
    cardShape === 'block' || (cardShape === 'grid' && `${cardBlock} block`),
    cardShape === 'wide' && `${cardWide} wide`,
    cardShape === 'list' && `${cardList} list`,
    cardShape === 'detail' && `${cardDetail} detail`,
    !showExcerpt && 'noExcerpt',
    (!itemType || itemType === 'display') && 'noActions',
    !showMedia && 'noMedia',
    bulkEdit && 'bulkEdit',
    bulkSelected && 'selected',
    className
  )

  const showTags = cardShape === 'detail'

  return (
    <article
      ref={ref}
      className={card}
      key={id}
      data-id={`article-card-${id}`}
      onClick={selectBulk}>
      <div className="selectedBack" />

      <FeatureFlag flag="item_id_overlay" dev={true}>
        <span className="idOverlay">{id}</span>
      </FeatureFlag>
      <div className="cardWrap">
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
            <Link href={openUrl}>
              <a onClick={onOpen} target={openExternal ? '_blank' : undefined}>
                {title}
              </a>
            </Link>
          </h2>

          <cite className="details">
            {/*eslint-disable-next-line */}
            <a className="publisher" href={original_url} target="_blank" onClick={itemOriginalOpen}>
              {publisher}
            </a>
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
  itemType: PropTypes.oneOf(['display', 'myList', 'discover', 'message', 'recit']),
  cardShape: PropTypes.oneOf(['block', 'grid', 'wide', 'list', 'detail']),
  actions: PropTypes.object,
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
  impressionAction: () => {},
  engagementAction: () => {},
  saveAction: () => {},
  reportAction: () => {},
  unSaveAction: () => {},
  openAction: () => {},
  itemBulkSelect: () => {},
  itemBulkDeSelect: () => {}
}
