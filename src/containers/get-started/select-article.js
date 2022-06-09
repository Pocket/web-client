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

// import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { css, cx } from 'linaria'
import { Card } from 'components/item-card/card'
import { Loader } from 'components/loader/loader'

const articleSelectorStyle = css`
  margin-top: 3rem;
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
  const articles = useSelector((state) => state.getStarted.articles)
  const topicSelectors = useSelector((state) => state.getStarted.topicsSelectors)
  const hasTopicSelectors = topicSelectors.length

  // Dispatch for topic selectors
  useEffect(() => {
    if (hasTopicSelectors) return
    dispatch(getTopicSelectors())
  }, [dispatch, hasTopicSelectors])

  // Dispatch for articles
  useEffect(() => {
    dispatch(getArticleSelectors())
  }, [dispatch])

  // Get any stored topics
  useEffect(() => {
    const { getStartedUserTopics } = parseCookies()
    const userTopics = getStartedUserTopics ? JSON.parse(getStartedUserTopics) : []
    dispatch(hydrateGetStarted({ userTopics }))
  }, [dispatch])

  return (
    <Layout metaData={metaData} className={getStartedContainerStyle} noNav={true}>
      <header className="page-header">
        <h1 className="title">Select the article that you find most interesting</h1>
        <h2 className="sub-head">Save an article to continue</h2>
      </header>
      {articles.length ? (
        <div className={articleGrid}>
          {articles.map((id, index) => (
            <SelectArticleCard key={id} id={id} position={index} />
          ))}
        </div>
      ) : (
        <div className={loaderStyle}>
          <Loader isVisible />
        </div>
      )}
      <footer className="page-footer">
        <Button className="button" variant="inline">
          Skip
        </Button>
      </footer>

      <SaveConfirm />
    </Layout>
  )
}

const selectorCardStyle = css`
  padding-bottom: 2.25rem;
  cursor: pointer;
  &:hover .selectedBack {
    display: block;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
  }
  .card-actions {
    margin-bottom: 0.25rem;
    padding: 0.75rem;
    width: 100%;
    &:hover {
      color: var(--color-textPrimary);
    }
  }
  a.publisher:hover {
    text-decoration: none;
    color: ;
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
  if (!item) return null

  const { title, publisher, excerpt, timeToRead, isSyndicated, fromPartner, thumbnail } = item //prettier-ignore
  const ActionMenu = noAction ? null : SelectCardActions
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

  const { saveStatus, saveUrl } = item

  // Prep save action
  const onSave = () => dispatch(saveArticle(saveUrl))

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
      />
    </div>
  ) : null
}
