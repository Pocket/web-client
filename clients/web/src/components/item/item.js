import { cx } from '@emotion/css'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import ReactMarkdown from 'react-markdown'
import { SyndicatedIcon } from '@ui/icons/SyndicatedIcon'
import { NewViewIcon } from '@ui/icons/NewViewIcon'
import { CardMedia } from 'components/item/item-media'
import { ItemTags } from 'components/item/item-tags'
import { itemStyles } from './item-styles'
import { useIntersectionObserver } from 'common/utilities/intersection/intersection'

import { ListViewAltIcon } from '@ui/icons/ListViewAltIcon'
import { ListStatusLink } from 'components/shareable-lists/list-status-link'
import { ItemNote } from 'components/item/item-note'

const allowsMarkdownElements = ['h1', 'h2', 'h3', 'p', 'a', 'strong', 'em', 'ul', 'ol', 'li']

export const Item = (props) => {
  const {
    itemId,
    listId,
    title,
    itemImage,
    onImageFail,
    publisher,
    publisherLogo,
    excerpt,
    timeToRead,
    note,
    isFavorite,
    isArchive,
    isPremium,
    isSyndicated,
    isCollection,
    authors,
    storyCount,
    itemCount,
    isInternalItem,
    saveStatus,
    externalUrl,
    openUrl,
    fromPartner,
    topicName,
    isUserList,
    tags,
    type,
    listStatusInfo,

    // Data
    bulkEdit,
    bulkSelected,
    shortcutSelected,
    bulkIsCurrent,

    // UI
    className,
    useMarkdown,
    partnerType,
    clamp,
    showExcerpt,
    visibleCount,

    //Positioning
    style,
    position,

    // Actions
    Actions,
    NoteActions,
    shortcutSelect,
    selectBulk,
    analyticsData,

    // Tracking
    onItemInView,
    snowplowId,
    onOpenOriginalUrl,
    onOpen,
    onCopyPublicUrl,
    onOpenPublicUrl
  } = props

  const { t } = useTranslation()

  /**
   * Layout is defined here.
   * ----------------------------------------------------------------
   */
  const itemClassName = cx(itemStyles, clamp && 'clamped', showExcerpt && 'showExcerpt', className, type,
    bulkIsCurrent && 'bulkCurrent',
    bulkEdit && 'bulkEdit',
    (bulkSelected || shortcutSelected) && 'selected'
  ) //prettier-ignore

  const openInNewTab = !isInternalItem
  const linkTarget = openInNewTab ? '_blank' : undefined
  const linkRel = openInNewTab ? 'noopener' : undefined
  const [tagsShown, setTagsShown] = useState(false)

  const viewRef = useRef(null)
  const linkRef = useRef(null)
  const footerRef = useRef(null)

  const showTags = () => setTagsShown(true)
  const hideTags = () => setTagsShown(false)
  const tagCount = tags?.length

  // Fire a tracking event
  const entry = useIntersectionObserver(viewRef, { freezeOnceVisible: true, threshold: 0.5 })
  if (!!entry?.isIntersecting && onItemInView) onItemInView(true)

  // Fire when item is selected by shortcut
  // This allows us to keep shortcuts in sync with tab selection and in view
  useEffect(() => {
    if (!linkRef.current) return () => {}
    const selectedAndNotActive = shortcutSelected && document.activeElement !== linkRef.current
    const notSelectedAndActive = !shortcutSelected && document.activeElement === linkRef.current

    if (notSelectedAndActive) linkRef.current.blur()
    if (selectedAndNotActive) {
      linkRef.current.focus()
    }
  }, [shortcutSelected, linkRef])

  const handleFocus = () => {
    if (!shortcutSelected && shortcutSelect) shortcutSelect()
  }

  return (
    <article
      style={style}
      className={itemClassName}
      key={itemId}
      data-testid="article-card"
      onClick={selectBulk}
      ref={viewRef}
      onFocus={handleFocus}>
      <span className="media-block" ref={footerRef}>
        <CardMedia
          topicName={topicName}
          isUserList={isUserList}
          image_src={itemImage}
          title={title}
          id={itemId}
          onOpen={onOpen}
          onImageFail={onImageFail}
          openInNewTab={openInNewTab}
          openUrl={openUrl}
        />
      </span>
      <div className="item-links">
        <Link
          href={openUrl}
          onClick={onOpen}
          className="content-block"
          data-testid="content-block"
          target={linkTarget}
          ref={linkRef}
          rel={linkRel}>
          <div className="content">
            {fromPartner ? <PartnerOverline partnerType={partnerType} /> : null}
            <h2 className={cx('title', openInNewTab && 'open-external')}>
              <span className="text">{title}</span>
              {openInNewTab ? (
                <NewViewIcon className="mobile-view-original" data-testid="view-original-icon" />
              ) : null}
            </h2>
            <Excerpt useMarkdown={useMarkdown} excerpt={excerpt} />
          </div>
        </Link>
        {listStatusInfo ? (
          <ListStatusLink
            listStatusInfo={listStatusInfo}
            handleCopyUrl={onCopyPublicUrl}
            handleOpenUrl={onOpenPublicUrl}
          />
        ) : null}
      </div>
      <footer className="footer">
        <cite className="details">
          {isCollection ? (
            <div>
              {authors.map((author) => (
                <span key={author.name}>{author.name}</span>
              ))}
            </div>
          ) : (
            <Publisher
              publisherLogo={publisherLogo}
              publisher={publisher}
              externalUrl={externalUrl}
              onOpenOriginalUrl={onOpenOriginalUrl}
              isSyndicated={isSyndicated}
            />
          )}

          <div className="context">
            {storyCount ? (
              <div className="story-count" data-testid="story-count">
                {t('item:story-count', '{{count}} stories', { count: storyCount })}
              </div>
            ) : null}
            {itemCount ? (
              <div className="item-count" data-testid="item-count">
                {t('item:item-count', '{{count}} items', { count: itemCount })}
              </div>
            ) : null}
            {isUserList ? (
              <div className="user-list-context" data-testid="user-list-context">
                <ListViewAltIcon /> {t('item:list', 'List')}
              </div>
            ) : null}
            {timeToRead && !isUserList ? (
              <div className="time-to-read" data-testid="time-to-read">
                {t('item:time-to-read', '{{timeToRead}} min', { timeToRead: timeToRead })}
              </div>
            ) : null}
            {tags?.length && type === 'detail' ? (
              <div
                className={cx('card-tags', tagsShown && 'show-tags')}
                data-testid="card-tags"
                onMouseEnter={showTags}>
                {t('item:tag-count', '{{count}} tag', { count: tagCount })}
                <ItemTags className="itemTags" tags={tags} mouseLeave={hideTags} />
              </div>
            ) : null}
          </div>
        </cite>

        <div className="footer-actions">
          {Actions ? (
            <Actions
              id={itemId}
              listId={listId}
              visibleCount={visibleCount}
              snowplowId={snowplowId}
              isFavorite={isFavorite}
              isArchive={isArchive}
              isPremium={isPremium}
              saveStatus={saveStatus}
              analyticsData={analyticsData}
              position={position}
            />
          ) : null}
        </div>
      </footer>
      {publisherLogo && publisher !== 'Pocket' ? (
        <img src={publisherLogo} alt={publisher} className="publisherLogo" />
      ) : null}
      {note ? (
        <ItemNote
          note={note}
          Actions={NoteActions}
          externalId={itemId}
          position={position}
          analyticsData={analyticsData}
        />
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
    <div>
      {externalUrl ? (
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
      {isSyndicated ? (
        <span className="syndicated">
          <SyndicatedIcon />
        </span>
      ) : null}
    </div>
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
