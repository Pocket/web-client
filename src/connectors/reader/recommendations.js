import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'linaria'
import { COLUMN_WIDTH_RANGE } from 'common/constants'
import { readerRecsRequest } from 'connectors/recit/recit.state'
import { breakpointTinyTablet } from 'common/constants'
import { Card } from 'components/item-card/card'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { itemActionStyle } from 'components/item-actions/base'
import { readerRecSaveItem } from 'connectors/recit/recit.state'

const asideWrapper = css`
  margin: 0 2.5rem;
  padding: 2.5rem 0;
  border-top: 1px solid var(--color-dividerTertiary);
  box-sizing: border-box;

  ${breakpointTinyTablet} {
    padding-bottom: 0;
  }

  @media print {
    display: none;
  }
`

const sectionWrapper = css`
  // Width of content minus content padding of 2.5rem
  max-width: calc(${COLUMN_WIDTH_RANGE[3]}px - 5rem);
  margin: 0 auto;
  padding: 2.5rem 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;

  article {
    margin: 0 0.5rem;
    padding: 0 0 1.5rem;
    height: unset;
    border-bottom-color: transparent;

    &:first-of-type {
      margin-left: 0;
      margin-top: 0;
    }
    &:last-of-type {
      margin-right: 0;
      border-bottom: none;
    }

    footer {
      bottom: 0;
    }
  }

  ${breakpointTinyTablet} {
    flex-direction: column;

    article {
      max-width: unset;
      margin: 0 0 1rem;
      border-bottom: 1px solid var(--color-dividerTertiary);
    }
  }
`

const headerStyles = css`
  font-size: 1.25rem;
  font-weight: 500;
  font-family: 'Graphik Web';
  color: var(--color-textSecondary);
  max-width: calc(${COLUMN_WIDTH_RANGE[3]}px - 5rem);
  margin: 0 auto;
`

export const Recommendations = ({ id }) => {
  const dispatch = useDispatch()

  const recommendations = useSelector((state) => state.recit.readerRecs)

  useEffect(() => {
    dispatch(readerRecsRequest(id))
  }, [dispatch, id])

  return Object.keys(recommendations).length ? (
    <aside className={asideWrapper}>
      <h2 className={headerStyles}>You Might Also Like</h2>
      <section className={sectionWrapper}>
        {Object.keys(recommendations).map((itemId, index) => (
          <RecCard key={itemId} id={itemId} position={index} />
        ))}
      </section>
    </aside>
  ) : null
}


const RecCard = ({ id, position }) => {
  const dispatch = useDispatch()

  // Get data from state
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const item = useSelector((state) => state.recit.readerRecs[id])
  const { saveStatus, itemId, readUrl, externalUrl, openExternal } = item
  const openUrl = readUrl && !openExternal ? readUrl : externalUrl
  const analyticsData = {
    id,
    url: openUrl,
    position,
    destination: saveStatus === 'saved' && !openExternal ? 'internal' : 'external'
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onOpen = () => dispatch(sendSnowplowEvent('reader.rec.open', analyticsData))
  const onImpression = () => dispatch(sendSnowplowEvent('reader.rec.impression', analyticsData))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)

  /** ITEM DETAILS
  --------------------------------------------------------------- */
  const itemImage = item?.noImage ? '' : item?.thumbnail
  const {tags, title, publisher, excerpt, timeToRead, isSyndicated, isInternalItem, fromPartner } = item //prettier-ignore

  return item ? (
    <Card
      itemId={itemId}
      externalUrl={externalUrl}
      tags={tags}
      title={title}
      itemImage={itemImage}
      publisher={publisher}
      excerpt={excerpt}
      timeToRead={timeToRead}
      isSyndicated={isSyndicated}
      isInternalItem={isInternalItem}
      fromPartner={fromPartner}
      cardShape="block"
      position={position}
      showExcerpt={true}
      onItemInView={onItemInView}
      onOpen={onOpen}
      onOpenOriginalUrl={onOpen}
      hiddenActions={false}
      openUrl={openUrl}
      ActionMenu={ActionsRec}
    />
  ) : null
}

export function ActionsRec({ id, position }) {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.recit.readerRecs[id])

  if (!item) return null
  const { saveUrl, saveStatus, readUrl, externalUrl, openExternal } = item

  // Prep save action
  const onSave = () => {
    const data = { id, url: saveUrl, position }
    dispatch(readerRecSaveItem(id, saveUrl, position))
    dispatch(sendSnowplowEvent('reader.rec.save', data))
  }

  // Open action
  const url = openExternal ? externalUrl : readUrl
  const onOpen = () => {
    const data = { id, url, position, destination: 'internal' }
    dispatch(sendSnowplowEvent('reader.rec.open', data))
  }

  return item ? (
    <div className={`${itemActionStyle} actions`}>
      <SaveToPocket
        allowRead={false}
        url={url}
        onOpen={onOpen}
        openExternal={openExternal}
        saveAction={onSave}
        isAuthenticated={isAuthenticated}
        saveStatus={saveStatus}
        id={id}
      />
    </div>
  ) : null
}
