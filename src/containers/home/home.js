// Vendor
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SideNav } from 'connectors/side-nav/side-nav'

import Layout from 'layouts/with-sidebar'

import { getTopicList } from 'connectors/topic-list/topic-list.state'
import { getRecentSaves } from 'containers/home/home.state'
import { getCollections } from 'containers/home/home.state'

import { HomeGreeting } from './homeGreeting'
import { HomeRecentRecsList } from 'containers/home/listRecentRecs'
import { HomeRecentList } from 'containers/home/listRecents'
import { TopicSelector } from 'containers/home/topicSelector'
import { HomeTopicsList } from 'containers/home/listTopics'
import { HomeCollectionList } from 'containers/home/listCollection'

import { homeSetPreferences } from './home.state'

import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'
import { ShareModal } from 'connectors/confirm-share/confirm-share'
import { ArchiveModal } from 'connectors/confirm-archive/confirm-archive'
import { FavoriteModal } from 'connectors/confirm-favorite/confirm-favorite'
import { Toasts } from 'connectors/toasts/toast-list'

export default function Collection(props) {
  const { metaData = {} } = props

  const dispatch = useDispatch()

  const userStatus = useSelector((state) => state.user.user_status)
  const shouldRender = userStatus !== 'pending'

  // Initialize data
  useEffect(() => {
    dispatch(getRecentSaves())
    dispatch(homeSetPreferences())
    dispatch(getTopicList())
    dispatch(getCollections())
  }, [dispatch])

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <SideNav subset="home" />
      {shouldRender ? (
        <main className="main">
          {/* <HomeGreeting /> */}

          {/* <HomeRecentList /> */}

          <HomeRecentRecsList />

          <TopicSelector />

          <HomeTopicsList />

          <HomeCollectionList />
        </main>
      ) : null}
      <DeleteModal />
      <TaggingModal />
      <ShareModal />
      <ArchiveModal />
      <FavoriteModal />
      <Toasts />
    </Layout>
  )
}
