// Vendor
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'linaria'
import { SideNav } from 'connectors/side-nav/side-nav'

import Layout from 'layouts/with-sidebar'

import { getTopicList } from 'connectors/topic-list/topic-list.state'
import { HomeJourneyHeader } from 'components/headers/home-header'
import { HomeSectionHeader } from 'components/headers/home-header'
import { TopicSelector } from 'components/topic-selector/topic-selector'

import { HomeTopicsList } from 'connectors/item-card/home/list'

import { setTopicSection } from './home.state'
import { unsetTopicSection } from './home.state'
import { saveHomeItem } from './home.state'
import { unSaveHomeItem } from './home.state'

const selectionStyles = css`
  margin-bottom: 2.25rem;
`

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
  const handleTopicClick = (topic) => {
    const topicAction = (topicSections.find(item => item.id === topic.id))
      ? unsetTopicSection
      : setTopicSection

    dispatch(topicAction(topic))
  }

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
            <div>
              <HomeSectionHeader
                sectionTitle="Latest Saves"
                sectionDescription="Dive into your content"
              />
            </div>
          ) : (
            <div className={selectionStyles}>
              <HomeJourneyHeader
                sectionTitle="Start Your Journey Here"
                sectionDescription="Select a few topics that you are interested in."
              />
              <TopicSelector
                topics={topics}
                topicSelections={topicSections}
                handleTopicClick={handleTopicClick}
              />
            </div>
          )}

          {topicSections?.length
            ? topicSections.map((topic) => (
                <HomeTopicsList
                  key={topic.display_name}
                  saveAction={saveHomeItem}
                  unSaveAction={unSaveHomeItem}
                  {...topic}
                />
              ))
            : null}
        </main>
      ) : null}
    </Layout>
  )
}
