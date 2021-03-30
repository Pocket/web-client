import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'linaria'
import { SyndicatedIcon } from '@pocket/web-ui'

import { urlWithPocketRedirect } from 'common/utilities'
import { CardMedia } from 'components/media/card-media'
import { FeatureFlag } from 'connectors/feature-flags/feature-flags'
import { ItemTags } from 'components/item-tags/item-tags'
import { ActionsMyList } from 'connectors/item-card/actions/my-list'
import { ActionsDiscover } from 'connectors/item-card/actions/discover'
import { ActionsBulkEdit } from 'connectors/item-card/actions/bulk-edit'
import { ActionsMessage } from 'connectors/item-card/actions/message'
import { ActionsRecit } from 'connectors/item-card/actions/recit'
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
  isAuthenticated,
  impressionAction,
  engagementAction,
  saveAction,
  reportAction,
  unSaveAction,
  openAction,
  itemBulkSelect,
  itemBulkDeSelect
}) => {
  const {
    item_id: id,
    status,
    tags,
    favorite,
    title,
    thumbnail,
    publisher,
    excerpt,
    read_time,
    open_url,
    openExternal,
    syndicated,
    save_url,
    save_status
  } = item

  // Fire item impression
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    if (inView) impressionAction(item, position, id)
  }, [inView, id, impressionAction, item, position])

  if (!item) return null

  const onSave = () => {
    if (isAuthenticated) {
      if (save_status === 'saved') engagementAction(item, position)
      if (save_status !== 'saved') saveAction(item, id, save_url, position)
      return
    }

    // Not authenticated so just tracking the click
    engagementAction(item, position)
  }

  const onReport = () => reportAction(item, position)
  const onOpen = () => openAction(item, position)

  /**
   * Layout is defined here.
   * ----------------------------------------------------------------
   */
  const card = cx(
    cardStyles,
    cardShape === 'block' && `${cardBlock} block`,
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

  const selectBulk = (event) => {
    if (!bulkEdit) return

    return bulkSelected
      ? itemBulkDeSelect(event.shiftKey)
      : itemBulkSelect(event.shiftKey)
  }

  const openUrl = openExternal ? urlWithPocketRedirect(open_url) : `/read/${id}`

  const actionsTypes = {
    myList: ActionsMyList,
    discover: ActionsDiscover,
    message: ActionsMessage,
    recit: ActionsRecit
  }

  const type = itemType === 'display' ? false : itemType
  const ActionsMenu = bulkEdit ? ActionsBulkEdit : actionsTypes[type]

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

      <Link href={openUrl}>
        <a onClick={onOpen} className="cardLink" target={openExternal ? "_blank" : undefined}>
          {showMedia ? (
            <CardMedia image_src={thumbnail} title={title} id={id} />
          ) : null}

          <div className="content">
            <h2 className="title">
              <span>{title}</span>
            </h2>

            <cite className="details">
              <span>{publisher}</span>

              {read_time ? (
                <span className="readtime">· {read_time} min</span>
              ) : null}

              {syndicated ? (
                <span className="syndicated">
                  <SyndicatedIcon />
                </span>
              ) : null}
            </cite>

            {showExcerpt ? <p className="excerpt">{excerpt}</p> : null}
          </div>
        </a>
      </Link>
      <footer className="footer">
        {showTags ? <ItemTags tags={tags} /> : null}
        {type ? (
          <ActionsMenu
            id={id}
            isAuthenticated={isAuthenticated}
            onSave={onSave}
            onReport={onReport}
            selected={bulkSelected}
            position={position}
            showTags={showTags}
            tags={tags}
            saveStatus={save_status}
            favorite={favorite}
            openUrl={openUrl}
            onOpen={onOpen}
            openExternal={openExternal}
          />
        ) : null}
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
  cardShape: PropTypes.oneOf(['block', 'wide', 'list', 'detail']),
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
