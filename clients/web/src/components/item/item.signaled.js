import { cx } from '@emotion/css'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import ReactMarkdown from 'react-markdown'
import { SyndicatedIcon } from '@ui/icons/SyndicatedIcon'
import { CardMedia } from 'components/item/item-media'
import { itemStyles } from './item-styles'
import { useInView } from 'react-intersection-observer'
import { OverflowMenuIcon } from '@ui/icons/OverflowMenuIcon'

const allowsMarkdownElements = ['h1', 'h2', 'h3', 'p', 'a', 'strong', 'em', 'ul', 'ol', 'li']

export const ItemSignaled = (props) => {
  const {
    itemId,
    slateId,
    listId,
    title,
    itemImage,
    onImageFail,
    publisher,
    publisherLogo,
    excerpt,
    isFavorite,
    isArchive,
    isPremium,
    isSyndicated,
    isCollection,
    authors,
    saveStatus,
    externalUrl,
    openUrl,
    fromPartner,
    topicName,
    isUserList,
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

    //Positioning
    style,
    position,

    // Actions
    Actions,
    shortcutSelect,
    selectBulk,
    analyticsData,
    onReport,
    onCompleteDemotion,
    isDemoted,

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

  const linkRef = useRef(null)
  const footerRef = useRef(null)

  // Fire a tracking event
  const [viewRef] = useInView({
    triggerOnce: true,
    threshold: 0.5,
    onChange: (inView) => inView && onItemInView(true)
  })

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

  const onAnimationEnd = (e) => {
    if (e.target == viewRef.current) onCompleteDemotion()
  }

  return (
    <article
      style={style}
      className={cx(itemClassName, isDemoted && 'demoted')}
      key={`signaled-${itemId}`}
      data-testid="article-card"
      onClick={selectBulk}
      ref={viewRef}
      onAnimationEnd={onAnimationEnd}
      onFocus={handleFocus}>
      <span className="media-block" ref={footerRef}>
        <CardMedia
          topicName={topicName}
          isUserList={isUserList}
          itemImage={itemImage}
          title={title}
          id={itemId}
          onOpen={onOpen}
          showViewOriginal={false}
          onImageFail={onImageFail}
          openUrl={openUrl}
        />
        {onReport ? (
          <button className="report" onClick={onReport}>
            <OverflowMenuIcon />
          </button>
        ) : null}
      </span>
      <div className="item-links">
        <div className="content">
          {fromPartner ? <PartnerOverline partnerType={partnerType} /> : null}
          <cite className="topDetails content-block">
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
          </cite>
          <Link
            href={openUrl}
            onClick={onOpen}
            className="content-block"
            data-testid="content-block"
            ref={linkRef}
            rel="noopener">
            <h2 className={cx('title withTopDetails')}>{title}</h2>
            <Excerpt useMarkdown={useMarkdown} excerpt={excerpt} />
          </Link>
        </div>
      </div>
      <footer className="footer signaled">
        <div className="footer-actions">
          {Actions ? (
            <Actions
              id={itemId}
              slateId={slateId}
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
