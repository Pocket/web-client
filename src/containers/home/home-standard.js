import { useEffect } from 'react'
import { getTopicList } from 'connectors/topic-list/topic-list.state'
import { getCollections } from 'containers/home/home.state'
import { HomeTopicSelector } from 'containers/home/topic-selector'
import { HomeTopicsList } from 'containers/home/list-topics'
import { HomeCollectionList } from 'containers/home/list-collection'
import { HomeGreeting } from 'containers/home/home-greeting'
import { homeHydrate } from './home.state'
import { useDispatch, useSelector } from 'react-redux'

import { SideNav } from 'connectors/side-nav/side-nav'
import Layout from 'layouts/with-sidebar'
import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'
import { ShareModal } from 'connectors/confirm-share/confirm-share'
import { ArchiveModal } from 'connectors/confirm-archive/confirm-archive'
import { FavoriteModal } from 'connectors/confirm-favorite/confirm-favorite'
import { Onboarding } from 'connectors/onboarding/onboarding'
import { Toasts } from 'connectors/toasts/toast-list'

export const HomeStandard = ({ metaData }) => {
  const dispatch = useDispatch()
  const selectedTopics = useSelector((state) => state.settings.pinnedTopics)

  // Initialize data
  useEffect(() => {
    dispatch(getTopicList())
    dispatch(getCollections())
  }, [dispatch])

  useEffect(() => {
    dispatch(homeHydrate(selectedTopics))
  }, [selectedTopics, dispatch])

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <SideNav subset="home" />
      <main className="main">
        <HomeGreeting />

        <HomeTopicsList />

        <HomeTopicSelector />

        <HomeCollectionList />
      </main>
      <DeleteModal />
      <TaggingModal />
      <ShareModal />
      <ArchiveModal />
      <FavoriteModal />
      <Onboarding type="home.modal" />
      <Onboarding type="home.flyaway.save" />
      <Onboarding type="home.flyaway.my-list" />
      <Toasts />
    </Layout>
  )
}
