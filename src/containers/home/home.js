// Vendor
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'linaria'
import { SideNav } from 'connectors/side-nav/side-nav'

import Layout from 'layouts/with-sidebar'

import { getTopicList } from 'connectors/topic-list/topic-list.state'
import { getRecentSaves } from 'containers/home/home.state'
import { getCollections } from 'containers/home/home.state'
import { HomeJourneyHeader } from 'components/headers/home-header'
import { HomeSectionHeader } from 'components/headers/home-header'
import { TopicSelector } from 'components/topic-selector/topic-selector'
import { CollectionCard } from 'components/item-card/home/collection-card'

import { HomeTopicsList } from 'connectors/item-card/home/listTopics'
import { HomeRecentList } from 'connectors/item-card/home/listRecent'
import { homeCollections } from 'components/items-layout/home-collections'

import { homeSetPreferences } from './home.state'
import { setTopicSection } from './home.state'
import { unsetTopicSection } from './home.state'
import { saveHomeItem } from './home.state'
import { unSaveHomeItem } from './home.state'
import { setHomeImpression } from './home.state'

import { topicToggleEvent } from './home.analytics'
import { topicImpressionEvent } from './home.analytics'
import { topicSaveEvent } from './home.analytics'
import { topicEngagementEvent } from './home.analytics'
import { topicOpenEvent } from './home.analytics'

const selectionStyles = css`
  margin-bottom: 2.25rem;
`

export default function Collection(props) {
  const { metaData = {} } = props

  const dispatch = useDispatch()

  const collectionSet = useSelector((state) => state.home.collectionSet)
  const topicSections = useSelector((state) => state.home.topicSections)
  const recentSaves = useSelector((state) => state.home.recentSaves)
  const impressions = useSelector((state) => state.home.impressions)

  const userStatus = useSelector((state) => state.user.user_status)
  const shouldRender = userStatus !== 'pending'

  // Get topicList for sections that require it
  const topics = useSelector((state) => state.topicList?.topicsByName)

  // Actions
  const handleTopicClick = (topic) => {
    const topicAction = topicSections.find((item) => item.id === topic.id)
      ? unsetTopicSection
      : setTopicSection

    dispatch(topicAction(topic))
    dispatch(topicToggleEvent(topic.topic))
  }

  const handleTopicImpression = (item, position, id) => {
    if (!impressions[id]) {
      dispatch(topicImpressionEvent(item, position))
      dispatch(setHomeImpression(id))
    }
  }

  const handleSaveItem = (item, id, url, position) => {
    dispatch(saveHomeItem(id, url, position))
    dispatch(topicSaveEvent(item, position))
  }

  const handleTopicEngagement = (item, position) => {
    dispatch(topicEngagementEvent(item, position))
  }

  const handleOpenEvent = (item, position) => {
    dispatch(topicOpenEvent(item, position))
  }

  // Initialize data
  useEffect(() => {
    dispatch(homeSetPreferences())
    dispatch(getTopicList())
    // dispatch(getRecentSaves()) // Commenting this out to iterate on recent saves
    dispatch(getCollections())
  }, [dispatch])

  const journeyTitles = [
    'Start Your Journey Here',
    'Continue building your page',
    'Add more topics to your page'
  ]
  const journeyTitle =
    journeyTitles[Math.min(topicSections?.length, Math.max(0, 2))]

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <SideNav subset="home" />
      {shouldRender ? (
        <main className="main">
          {recentSaves?.length ? <HomeRecentList /> : null}

          {topicSections?.length
            ? topicSections.map((topic) => (
                <HomeTopicsList
                  key={topic.display_name}
                  saveAction={handleSaveItem}
                  unSaveAction={unSaveHomeItem}
                  impressionAction={handleTopicImpression}
                  engagementAction={handleTopicEngagement}
                  openAction={handleOpenEvent}
                  {...topic}
                />
              ))
            : null}

          <div className={selectionStyles}>
            <HomeJourneyHeader
              sectionTitle={journeyTitle}
              sectionDescription="Select topics that interest you to start building your page."
            />
            <TopicSelector
              topics={topics}
              topicSections={topicSections}
              handleTopicClick={handleTopicClick}
            />
          </div>

          {collectionSet?.length ? (
            <>
              <HomeSectionHeader
                sectionTitle="Our Most Read Collections"
                sectionDescription="Discover some of our most interesting reads in these collections."
              />
              <div className={homeCollections}>
                {collectionSet.map((collection, index) => (
                  <CollectionCard
                    collection={collection}
                    index={index}
                    key={collection.title}
                  />
                ))}
              </div>
            </>
          ) : null}
        </main>
      ) : null}
    </Layout>
  )
}
