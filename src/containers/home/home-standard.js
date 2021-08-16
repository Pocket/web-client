import { useEffect } from 'react'
import { getTopicList } from 'connectors/topic-list/topic-list.state'
import { getCollections } from 'containers/home/home.state'
import { HomeTopicSelector } from 'containers/home/topic-selector'
import { HomeTopicsList } from 'containers/home/list-topics'
import { HomeCollectionList } from 'containers/home/list-collection'
import { HomeGreeting } from 'containers/home/home-greeting'
import { homeHydrate } from './home.state'
import { useDispatch, useSelector } from 'react-redux'

export const HomeStandard = () => {
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
    <>
      <HomeGreeting />

      <HomeTopicsList />

      <HomeTopicSelector />

      <HomeCollectionList />
    </>
  )
}
