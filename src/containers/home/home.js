// Vendor
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SideNav } from 'connectors/side-nav/side-nav'

import Layout from 'layouts/with-sidebar'

import { getTopicList } from 'connectors/topic-list/topic-list.state'
import { getCollections } from 'containers/home/home.state'

import { HomeGreeting } from 'containers/home/home-greeting'
import { HomeTopicSelector } from 'containers/home/topic-selector'
import { HomeTopicsList } from 'containers/home/list-topics'
import { HomeCollectionList } from 'containers/home/list-collection'

import { homeHydrate } from './home.state'

import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'
import { ShareModal } from 'connectors/confirm-share/confirm-share'
import { ArchiveModal } from 'connectors/confirm-archive/confirm-archive'
import { FavoriteModal } from 'connectors/confirm-favorite/confirm-favorite'
import { Onboarding } from 'connectors/onboarding/onboarding'
import { Toasts } from 'connectors/toasts/toast-list'
import { Flyaway } from 'components/flyaway/flyaway'

export default function Home(props) {
  const { metaData = {} } = props

  const dispatch = useDispatch()

  const userStatus = useSelector((state) => state.user.user_status)
  const selectedTopics = useSelector((state) => state.settings.pinnedTopics)
  const shouldRender = userStatus !== 'pending'

  // Initialize data
  useEffect(() => {
    dispatch(getTopicList())
    dispatch(getCollections())
  }, [dispatch])

  useEffect(() => {
    dispatch(homeHydrate(selectedTopics))
  }, [selectedTopics.length])

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <SideNav subset="home" />
      {shouldRender ? (
        <main className="main">
          <HomeGreeting />

          <HomeTopicsList />

          <HomeTopicSelector />

          <HomeCollectionList />
        </main>
      ) : null}
      <DeleteModal />
      <TaggingModal />
      <ShareModal />
      <ArchiveModal />
      <FavoriteModal />
      <Onboarding type="home.modal" />
      <Onboarding type="home.flyaway.save" />
      <Toasts />
    </Layout>
  )
}
