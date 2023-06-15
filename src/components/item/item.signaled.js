import { cx } from '@emotion/css'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import ReactMarkdown from 'react-markdown'
import { SyndicatedIcon } from 'components/icons/SyndicatedIcon'
import { NewViewIcon } from 'components/icons/NewViewIcon'
import { CardMedia } from 'components/item/item-media'
import { itemStyles } from './item-styles'
import { useIntersectionObserver } from 'common/utilities/intersection/intersection'
import { OverflowMenuIcon } from 'components/icons/OverflowMenuIcon'

const allowsMarkdownElements = ['h1', 'h2', 'h3', 'p', 'a', 'strong', 'em', 'ul', 'ol', 'li']

export const ItemSignaled = (props) => {
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
    isUserList,
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
    shortcutSelect,
    selectBulk,
    analyticsData,
    onReport,
    onDemote,
    onPromote,
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

  const openInNewTab = !isInternalItem
  const linkTarget = openInNewTab ? '_blank' : undefined
  const linkRel = openInNewTab ? 'noopener noreferrer' : undefined

  const viewRef = useRef(null)
  const linkRef = useRef(null)
  const footerRef = useRef(null)

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

  const handleAnimationEnd = () => {
    setTimeout(() => {
      onCompleteDemotion()
    }, 150)
  }

  const handleAnimationStart = () => {
    console.log('Animation Started')
  }

  if (isDemoted) handleAnimationEnd()

  return (
    <article
      style={style}
      className={cx(itemClassName, isDemoted && 'demoted')}
      key={`signaled-${itemId}`}
      data-cy="article-card"
      onClick={selectBulk}
      onFocus={handleFocus}>
      <span className="media-block" ref={footerRef}>
        <CardMedia
          topicName={topicName}
          isUserList={isUserList}
          image_src={itemImage}
          title={title}
          id={itemId}
          onOpen={onOpen}
          showViewOriginal={false}
          onImageFail={onImageFail}
          openInNewTab={openInNewTab}
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
            data-cy="content-block"
            target={linkTarget}
            ref={linkRef}
            rel={linkRel}>
            <h2 className={cx('title withTopDetails', openInNewTab && 'open-external')}>
              {title}
              {openInNewTab ? (
                <NewViewIcon className="mobile-view-original" data-cy="view-original-icon" />
              ) : null}
            </h2>
            <Excerpt useMarkdown={useMarkdown} excerpt={excerpt} />
          </Link>
        </div>
      </div>
      <footer className="footer">
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
              onDemote={onDemote}
              onPromote={onPromote}
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
