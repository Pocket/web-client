import { cx } from 'linaria'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import ReactMarkdown from 'react-markdown'
import { SyndicatedIcon } from 'components/icons/SyndicatedIcon'
import { NewViewIcon } from 'components/icons/NewViewIcon'
import { CardMedia } from 'components/item/item-media'
import { ItemTags } from 'components/item/item-tags'
import { itemStyles } from './item-styles'
import { useInView } from 'react-intersection-observer'
import { ListStatus } from 'components/shareable-lists/list-status'

const allowsMarkdownElements = ['h1', 'h2', 'h3', 'p', 'a', 'strong', 'em', 'ul', 'ol', 'li']

export const Item = (props) => {
  const {
    itemId,
    title,
    itemImage,
    onImageFail,
    publisher,
    publisherLogo,
    excerpt,
    timeToRead,
    isFavorite,
    isArchive,
    isPremium,
    isSyndicated,
    isCollection,
    authors,
    storyCount,
    isInternalItem,
    saveStatus,
    externalUrl,
    openUrl,
    fromPartner,
    topicName,
    tags,
    type,

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
    listStatus,
    listUrl,

    //Positioning
    style,

    // Actions
    Actions,
    shortcutSelect,
    selectBulk,
    onListDelete,

    // Tracking
    onItemInView,
    snowplowId,
    onOpenOriginalUrl,
    onOpen
  } = props

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
  const linkRel = openInNewTab ? 'noopener noreferrer' : undefined
  const [tagsShown, setTagsShown] = useState(false)
  const [viewRef, inView] = useInView({ triggerOnce: true, threshold: 0.5 })

  const linkRef = useRef(null)
  const footerRef = useRef(null)

  const showTags = () => setTagsShown(true)
  const hideTags = () => setTagsShown(false)

  // Fire when item is in view
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
      data-cy="article-card"
      onClick={selectBulk}
      ref={viewRef}
      onFocus={handleFocus}>
      <span className="media-block" ref={footerRef}>
        <CardMedia
          topicName={topicName}
          image_src={itemImage}
          title={title}
          id={itemId}
          onOpen={onOpen}
          onImageFail={onImageFail}
          openInNewTab={openInNewTab}
          openUrl={openUrl}
        />
      </span>
      <div>
        <Link href={openUrl}>
          <a
            onClick={onOpen}
            className="content-block"
            data-cy="content-block"
            target={linkTarget}
            ref={linkRef}
            rel={linkRel}>
            <div className="content">
              {fromPartner ? <PartnerOverline partnerType={partnerType} /> : null}
              <h2 className={cx('title', openInNewTab && 'open-external')}>
                {title}
                {openInNewTab ? (
                  <NewViewIcon className="mobile-view-original" data-cy="view-original-icon" />
                ) : null}
              </h2>
              <Excerpt useMarkdown={useMarkdown} excerpt={excerpt} />
            </div>
          </a>
        </Link>
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
            {listStatus ? <ListStatus status={listStatus} url={listUrl} /> : null}
            {storyCount ? (
              <div className="story-count" data-cy="story-count">
                {storyCount} stories
              </div>
            ) : null}
            {timeToRead ? (
              <div className="time-to-read" data-cy="time-to-read">
                {timeToRead} min
              </div>
            ) : null}
            {tags?.length && type === 'detail' ? (
              <div
                className={cx('card-tags', tagsShown && 'show-tags')}
                data-cy="card-tags"
                onMouseEnter={showTags}>
                {tags?.length} tags
                <ItemTags className="itemTags" tags={tags} mouseLeave={hideTags} />
              </div>
            ) : null}
          </div>
        </cite>

        <div className="footer-actions">
          {Actions ? (
            <Actions
              id={itemId}
              visibleCount={visibleCount}
              snowplowId={snowplowId}
              isFavorite={isFavorite}
              isArchive={isArchive}
              isPremium={isPremium}
              saveStatus={saveStatus}
              deleteAction={onListDelete}
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
    <div>
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
