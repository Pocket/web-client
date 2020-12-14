import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'linaria'
import { SyndicatedIcon } from '@pocket/web-ui'

import { urlWithPocketRedirect } from 'common/utilities'
import { CardMedia } from 'components/media/card-media'
import { FeatureFlag } from 'connectors/feature-flags/feature-flags'

import { ActionsMyList } from 'connectors/item-card/actions/my-list'
import { ActionsDiscover } from 'connectors/item-card/actions/discover'
import { ActionsBulkEdit } from 'connectors/item-card/actions/bulk-edit'
import { ActionsMessage } from 'connectors/item-card/actions/message'
import { cardStyles } from './card-base'

import Link from 'next/link'

const cardBlock = css`
  max-width: 552px;
  &.noMedia {
    a.cardLink .title {
      margin-top: 0;
    }
  }
`

const cardWide = css`
  max-width: 745px;

  a.cardLink {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-column-gap: var(--size150);
    padding-bottom: 0;

    .media {
      grid-column: span 3;
    }
    .content {
      grid-column: span 5;
      padding-bottom: var(--size200);
    }
    .title {
      margin-top: 0;
      font-size: var(--fontSize150);
      line-height: 1.286;
      max-height: 3.8em;
    }
  }

  .footer {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-column-gap: var(--size150);
    .actions {
      grid-column: 4 / span 5;
    }
  }

  &.noActions {
    a.cardLink .content {
      padding-bottom: 0;
    }
  }

  &.noMedia {
    a.cardLink .content,
    .footer .actions {
      grid-column: span 8;
    }
  }
`

const cardList = css`
  max-width: 940px;
  padding: var(--size100) 0;

  a.cardLink {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: var(--size150);
    padding-bottom: 0;

    .media {
      grid-column: span 1;
    }
    .content {
      grid-column: span 11;
    }
    .title {
      margin-top: 0;
      font-size: var(--fontSize100);
      line-height: 1.286;
      width: 70%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .details {
      padding: 0;
    }
    .excerpt {
      display: none;
    }
  }
  .footer {
    width: initial;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    .actions {
      padding: 0;
    }
  }
`

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
  actions,
  bulkEdit,
  bulkSelected,
  position
}) => {
  const {
    item_id: id,
    status,
    favorite,
    title,
    thumbnail,
    publisher,
    excerpt,
    read_time,
    open_url,
    openExternal,
    syndicated,
    onOpen = () => {}
  } = item

  const { itemBulkSelect, itemBulkDeSelect } = actions

  const card = cx(
    cardStyles,
    cardShape === 'block' && `${cardBlock} block`,
    cardShape === 'wide' && `${cardWide} wide`,
    cardShape === 'list' && `${cardList} list`,
    !showExcerpt && 'noExcerpt',
    (!itemType || itemType === 'display') && 'noActions',
    !showMedia && 'noMedia',
    bulkEdit && 'bulkEdit',
    bulkSelected && 'selected'
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
    message: ActionsMessage
  }

  const type = itemType === 'display' ? false : itemType
  const ActionsMenu = bulkEdit ? ActionsBulkEdit : actionsTypes[type]

  return (
    <article
      className={card}
      key={id}
      data-id={`article-card-${id}`}
      onClick={selectBulk}>
      <div className="selectedBack" />

      <FeatureFlag flag="temp.web.client.dev.card.item_id_overlay" dev={true}>
        <span className="idOverlay">{id}</span>
      </FeatureFlag>

      <Link href={openUrl}>
        <a onClick={onOpen} className="cardLink">
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
        {type ? (
          <ActionsMenu
            id={id}
            selected={bulkSelected}
            position={position}
            status={status}
            favorite={favorite}
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
  itemType: PropTypes.oneOf(['myList', 'discover', 'message']),
  cardShape: PropTypes.oneOf(['block', 'wide', 'list']),
  actions: PropTypes.object,
  bulkEdit: PropTypes.bool,
  bulkSelected: PropTypes.bool,
  position: PropTypes.number
}

Card.defaultProps = {
  cardShape: 'block'
}
