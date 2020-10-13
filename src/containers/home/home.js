// Vendor
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SideNav } from 'components/side-nav/side-nav'

import Layout from 'layouts/with-sidebar'

import { getHomeLatestData } from './home.state'
import { getDiscoverData } from './home.state'
import { getTopicList } from 'connectors/topic-list/topic-list.state'
import { SectionHeader } from 'components/headers/section-header'
import { DynamicCardLayout } from 'components/items-layout/dynamic-blocks'
import { CardList } from 'components/items-layout/dynamic-blocks'
import { CardTopicsNav } from 'components/items-layout/topic-list'

export default function Collection(props) {
  const { metaData = {}, subset = 'active' } = props

  const dispatch = useDispatch()

  const latestSaves = useSelector((state) => state.home.latest)
  const discover = useSelector((state) => state.home.discover)

  // Get topicList for sections that require it
  const topics = useSelector((state) => state.topicList?.topicsByName)

  useEffect(() => {
    dispatch(getHomeLatestData())
    dispatch(getDiscoverData())
    dispatch(getTopicList())
  }, [])

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <SideNav subset="home" />
      <main className="main">
        {latestSaves?.length ? (
          <>
            <SectionHeader
              sectionTitle="Latest Saves"
              sectionDescription="Dive into your content"
            />
            <DynamicCardLayout>
              {/* Top Lockup (left)*/}
              <CardList
                type="lockupCenter"
                count={5}
                itemType="my-list"
                items={latestSaves}
              />
            </DynamicCardLayout>
          </>
        ) : null}
        {discover?.length ? (
          <>
            <CardTopicsNav topics={topics} track={() => {}} />
            <br />
            <br />
            <SectionHeader
              sectionTitle="Today’s essential reads"
              sectionDescription="The best of the web"
            />
            <DynamicCardLayout>
              {/* Top Lockup (left)*/}
              <CardList type="lockupRight" count={5} items={discover} />
            </DynamicCardLayout>
          </>
        ) : null}
      </main>
    </Layout>
  )
}
