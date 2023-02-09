import { cx } from 'linaria'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import ReactMarkdown from 'react-markdown'
import { SyndicatedIcon } from 'components/icons/SyndicatedIcon'
import { NewViewIcon } from 'components/icons/NewViewIcon'
import { CardMedia } from 'components/items-media/card-media'
import { ItemTags } from 'components/item-tags/item-tags'
import { itemStyles } from './item-styles'

const allowsMarkdownElements = ['h1', 'h2', 'h3', 'p', 'a', 'strong', 'em', 'ul', 'ol', 'li']

export const Item = (props) => {
  const {
    itemId,
    title,
    itemImage,
    publisher,
    publisherLogo,
    excerpt,
    timeToRead,
    isFavorite,
    isArchive,
    isPremium,
    isSyndicated,
    isInternalItem,
    saveStatus,
    openUrl,
    fromPartner,
    topicName,
    tags,
    type,

    // UI
    className,
    useMarkdown,
    partnerType,
    clamp,
    showExcerpt,
    visibleCount,

    //Positioning
    style,

    // Actions
    Actions,

    // Tracking
    // onItemInView,
    snowplowId,
    onOpenOriginalUrl,
    onOpen
  } = props

  /**
   * Layout is defined here.
   * ----------------------------------------------------------------
   */
  const itemClassName = cx(itemStyles, clamp && 'clamped', showExcerpt && 'showExcerpt', className, type) //prettier-ignore
  const openInNewTab = !isInternalItem
  const linkTarget = openInNewTab ? '_blank' : undefined
  const linkRel = openInNewTab ? 'noopener noreferrer' : undefined

  return (
    <article style={style} className={itemClassName} key={itemId} data-cy="article-card">
      <span className="media-block">
        <CardMedia
          topicName={topicName}
          image_src={itemImage}
          title={title}
          id={itemId}
          openInNewTab={openInNewTab}
          openUrl={openUrl}
        />
      </span>
      <Link href={openUrl}>
        <a
          onClick={onOpen}
          className="content-block"
          data-cy="content-block"
          target={linkTarget}
          rel={linkRel}>
          <div className="content">
            {fromPartner ? <PartnerOverline partnerType={partnerType} /> : null}
            <h2 className={cx('title', openInNewTab && 'open-external')}>
              {title}{' '}
              {openInNewTab ? (
                <NewViewIcon className="mobile-view-original" data-cy="view-original-icon" />
              ) : null}
            </h2>
            <Excerpt useMarkdown={useMarkdown} excerpt={excerpt} />
          </div>
        </a>
      </Link>
      <footer className="footer">
        {tags?.length ? <ItemTags className="itemTags" tags={tags} /> : null}
        <cite className="details">
          <Publisher
            publisherLogo={publisherLogo}
            publisher={publisher}
            externalUrl={openUrl}
            onOpenOriginalUrl={onOpenOriginalUrl}
            isSyndicated={isSyndicated}
          />
          {timeToRead ? (
            <div className="time-to-read" data-cy="time-to-read">
              {timeToRead} min
            </div>
          ) : null}
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
