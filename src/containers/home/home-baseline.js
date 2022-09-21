import { useEffect } from 'react'
import { Card } from 'components/item-card/card'
import { listStrata } from 'components/items-layout/list-strata'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { getHomeContent } from './home-baseline.state'
import { useDispatch, useSelector } from 'react-redux'
import { HomeUnifiedHeader } from 'components/headers/home-header'
import { SaveToPocket } from 'components/item-actions/save-to-pocket'
import { itemActionStyle } from 'components/item-actions/base'
import { saveHomeItem } from 'containers/home/home-baseline.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const HomeContent = () => {
  const dispatch = useDispatch()
  const slates = useSelector((state) => state.homeUnified.slates)

  useEffect(() => {
    dispatch(getHomeContent())
  }, [dispatch])

  return slates.map((slateId) => <Slate key={slateId} slateId={slateId} />)
}

function Slate({ slateId }) {
  const slates = useSelector((state) => state.homeUnified.slates)
  const slate = useSelector((state) => state.homeUnified.slatesById[slateId])

  if (!slate) return null

  const { headline, subheadline, moreLink, recommendations } = slate
  const moreLinkTrack = () => {}
  const recCount = slates.indexOf(slateId) === 0 ? 6 : 3
  const recsToShow = recommendations.slice(0, recCount)

  return (
    <SectionWrapper>
      <div style={{ padding: '1.5rem 0' }}>
        <HomeUnifiedHeader
          headline={headline}
          subheadline={subheadline}
          moreLinkText={moreLink?.text}
          moreLinkUrl={moreLink?.url}
          moreLinkTrack={moreLinkTrack}
        />

        <div className={listStrata}>
          {recsToShow.map((corpusId) => (
            <ItemCard key={corpusId} corpusId={corpusId} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

function ItemCard({ corpusId }) {
  const item = useSelector((state) => state.homeUnified.itemsById[corpusId])
  if (!item) return null

  const { title, imageUrl, url, excerpt, publisher, topic } = item
  return (
    <Card
      itemId={corpusId}
      externalUrl={url}
      title={title}
      itemImage={imageUrl}
      publisher={publisher}
      excerpt={excerpt}
      showExcerpt={false}
      // Open Actions
      openUrl={url}
      onOpen={() => {}}
      onOpenOriginalUrl={() => {}}
      onItemInView={() => {}}
      onImageFail={() => {}}
      ActionMenu={CardActions}
    />
  )
}

function CardActions({ id }) {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.homeUnified.itemsById[id])
  if (!item) return null

  const { url, saveStatus } = item
  // const analyticsData = { id }

  // Prep save action
  const onSave = () => {
    // dispatch(sendSnowplowEvent('home.save', analyticsData))
    dispatch(saveHomeItem(id, url))
  }

  return (
    <div className={`${itemActionStyle} actions`}>
      <SaveToPocket
        allowRead={false}
        url={url}
        onOpen={() => {}}
        saveAction={onSave}
        isAuthenticated={isAuthenticated}
        saveStatus={saveStatus}
        id={id}
      />
    </div>
  )
}