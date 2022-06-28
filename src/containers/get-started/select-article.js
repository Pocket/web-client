import { useEffect } from 'react'
import { Button } from 'components/buttons/button'
import { useDispatch, useSelector } from 'react-redux'
import { listFullStyle } from 'components/items-layout/list-full'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { itemActionStyle } from 'components/item-actions/base'
import { saveArticle } from 'containers/get-started/get-started.state'
import { SaveConfirm } from './save-confirm'
import Layout from 'layouts/get-started'
import { getStartedContainerStyle } from './get-started'
import { getTopicSelectors } from './get-started.state'
import { getArticleSelectors } from './get-started.state'
import { parseCookies } from 'nookies'
import { hydrateGetStarted } from './get-started.state'
import { useRouter } from 'next/router'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { css, cx } from 'linaria'
import { Card } from 'components/item-card/card'
import { Loader } from 'components/loader/loader'
import { SaveIcon } from 'components/icons/SaveIcon'
import { breakpointTinyTablet } from 'common/constants'

const articleSelectorStyle = css`
  margin-top: 3rem;

  ${breakpointTinyTablet} {
    grid-row-gap: 2rem;
  }
`

const loaderStyle = css`
    margin-top: 3rem
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    min-height: 341px;
`

export const articleGrid = cx(articleSelectorStyle, listFullStyle)

export const SelectArticle = ({ metaData }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const articles = useSelector((state) => state.getStarted.articles)
  const articlesToUse = articles.slice(0, 3)
  const topicSelectors = useSelector((state) => state.getStarted.topicsSelectors)
  const finalizingTopics = useSelector((state) => state.getStarted.finalizingTopics)
  const hasTopicSelectors = topicSelectors.length

  // Dispatch for topic selectors
  useEffect(() => {
    if (hasTopicSelectors) return
    dispatch(getTopicSelectors())
  }, [dispatch, hasTopicSelectors])

  // Dispatch for articles if we are not in the process of finalizing topics
  useEffect(() => {
    if (finalizingTopics) return
    dispatch(getArticleSelectors())
  }, [dispatch, finalizingTopics])

  // Get any stored topics
  useEffect(() => {
    const { getStartedUserTopics } = parseCookies()
    const userTopics = getStartedUserTopics ? JSON.parse(getStartedUserTopics) : []
    dispatch(hydrateGetStarted({ userTopics }))
  }, [dispatch])

  const handleSkip = () => {
    dispatch(sendSnowplowEvent('get-started.article.skip'))
    router.push('/home?get-started=skip')
  }

  return (
    <Layout metaData={metaData} className={getStartedContainerStyle} noNav={true}>
      <header className="page-header">
        <h1 className="title">Save an article you find interesting</h1>
        <h2 className="sub-head with-icon">
          <SaveIcon />
          <span>
            <strong>Save</strong> one article
          </span>
        </h2>
      </header>
      {articlesToUse.length ? (
        <div className={articleGrid}>
          {articlesToUse.map((id, index) => (
            <SelectArticleCard key={id} id={id} position={index} />
          ))}
        </div>
      ) : (
        <div className={loaderStyle}>
          <Loader isVisible />
        </div>
      )}
      <footer className="page-footer">
        <Button className="button skip" variant="inline" onClick={handleSkip}>
          Skip
        </Button>
      </footer>

      <SaveConfirm />
    </Layout>
  )
}

const selectorCardStyle = css`
  padding-bottom: 2.25rem;

  .actions {
    ${breakpointTinyTablet} {
      grid-column: span 12 !important; // buh, couldn't find another way to override

      .card-actions {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
  }
  .card-actions {
    margin-bottom: 0.25rem;
    padding: 0.75rem;

    &.border {
      border: var(--borderStyle);
      border-width: 2px;
      border-color: var(--color-actionSecondary);

      .actionCopy {
        color: var(--color-actionSecondaryText);
      }

      &:hover,
      &:focus {
        background: var(--color-actionSecondary);
        .actionCopy {
          color: var(--color-actionSecondaryHoverText);
        }
      }
    }
  }
  a.publisher:hover {
    text-decoration: none;
  }
`

export const SelectArticleCard = ({
  id,
  position,
  noAction = false,
  cardShape = 'block',
  showExcerpt = false
}) => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.getStarted.articlesById[id])
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(item?.url))
  if (!item) return null

  const { title, publisher, excerpt, timeToRead, isSyndicated, fromPartner, thumbnail, analyticsData } = item //prettier-ignore
  const ActionMenu = noAction ? null : SelectCardActions

  const data = {
    position,
    ...analyticsData
  }

  const onItemInView = (inView) => {
    if (!impressionFired && inView)
      dispatch(sendSnowplowEvent('get-started.article.impression', data))
  }

  return (
    <Card
      itemId={id}
      title={title}
      itemImage={thumbnail}
      publisher={publisher}
      excerpt={excerpt}
      timeToRead={timeToRead}
      isSyndicated={isSyndicated}
      fromPartner={fromPartner}
      position={position}
      cardShape={cardShape}
      hiddenActions={false}
      showExcerpt={showExcerpt}
      className={selectorCardStyle}
      onItemInView={onItemInView}
      // Open Actions
      ActionMenu={ActionMenu}
    />
  )
}

const SelectCardActions = ({ id, position }) => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.getStarted.articlesById[id])

  if (!item) return null

  const { saveStatus, saveUrl, analyticsData } = item
  const data = {
    position,
    ...analyticsData
  }

  // Prep save action
  const onSave = () => {
    dispatch(sendSnowplowEvent('get-started.article.save', data))
    dispatch(saveArticle(saveUrl, id))
  }

  return item ? (
    <div className={`${itemActionStyle} actions`}>
      <SaveToPocket
        allowRead={false}
        url={saveUrl}
        openExternal={false}
        saveAction={onSave}
        isAuthenticated={isAuthenticated}
        saveStatus={saveStatus}
        id={id}
        border={true}
      />
    </div>
  ) : null
}
