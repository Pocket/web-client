// Vendor
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SideNav } from 'connectors/side-nav/side-nav'

import Layout from 'layouts/with-sidebar'

import { getTopicList } from 'connectors/topic-list/topic-list.state'
import { HomeJourneyHeader } from 'components/headers/home-header'
import { HomeSectionHeader } from 'components/headers/home-header'
import { TopicSelector } from 'components/topic-selector/topic-selector'

import { setTopicSection } from './home.state'
import { unsetTopicSection } from './home.state'

export default function Collection(props) {
  const { metaData = {} } = props

  const dispatch = useDispatch()

  const latestSaves = useSelector((state) => state.home.latest)
  const topicSections = useSelector((state) => state.home.topicSections)
  const topicData = useSelector((state) => state.home.topics)

  const userStatus = useSelector((state) => state.user.user_status)
  const shouldRender = userStatus !== 'pending'

  // Get topicList for sections that require it
  const topics = useSelector((state) => state.topicList?.topicsByName)

  // Actions
  const handleTopicClick = (topic) => dispatch(setTopicSection(topic))

  // Initialize data
  useEffect(() => {
    dispatch(getTopicList())
  }, [dispatch])

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <SideNav subset="home" />
      {shouldRender ? (
        <main className="main">
          {latestSaves?.length ? (
            <>
              <HomeSectionHeader
                sectionTitle="Latest Saves"
                sectionDescription="Dive into your content"
              />
            </>
          ) : (
            <>
              <HomeJourneyHeader
                sectionTitle="Start Your Journey Here"
                sectionDescription="Select a few topics that you are interested in."
              />
              <TopicSelector
                topics={topics}
                topicSelections={topicSections}
                handleTopicClick={handleTopicClick}
              />
            </>
          )}

          {topicSections?.length
            ? topicSections.map((topic) => (
                <HomeSectionHeader
                  key={topic.display_name}
                  sectionTitle={topic.display_name}
                  sectionDescription="This will need to be manually set for this test"
                  { /* topicData[topic.topic] */ }
                />
              ))
            : null}
        </main>
      ) : null}
    </Layout>
  )
}
