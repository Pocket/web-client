import { useEffect } from 'react'
import { SideNav as SideNavComponent } from 'components/side-nav/side-nav'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { mutateListCreate } from 'connectors/lists/mutation-create.state'
import { getRecentListsAction } from 'containers/lists/lists.state'

import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export function SideNav({ type, subset, isLoggedIn, tag }) {
  const dispatch = useDispatch()

  const flagsReady = useSelector((state) => state.features.flagsReady)
  const pinnedTags = useSelector((state) => state.settings.pinnedTags)
  const pinnedTopics = useSelector((state) => state.settings.pinnedTopics)
  const appMode = useSelector((state) => state?.app?.mode)
  const titleToIdList = useSelector((state) => state.pageListsInfo.titleToIdList)
  const enrolledPilot = useSelector((state) => state.pageListsInfo.enrolled)
  const featureState = useSelector((state) => state.features)
  const enrolledRelease = featureFlagActive({ flag: 'lists', featureState })
  const showLists = enrolledPilot || enrolledRelease

  useEffect(() => {
    if (showLists) dispatch(getRecentListsAction())
  }, [dispatch, showLists])

  const trackMenuClick = (label) => dispatch(sendSnowplowEvent('side-nav', { label }))
  const handleCreateList = () => {
    dispatch(sendSnowplowEvent('shareable-list.create.sidebar'))
    dispatch(mutateListCreate())
  }

  const isDisabled = appMode === 'bulk' || appMode === 'reorder'

  const pinTypes = {
    home: pinnedTopics,
    saves: pinnedTags
  }
  const pinned = pinTypes[type]

  return (
    <SideNavComponent
      type={type}
      isDisabled={isDisabled}
      subset={subset}
      isLoggedIn={isLoggedIn}
      pinned={pinned}
      tag={tag}
      flagsReady={flagsReady}
      trackMenuClick={trackMenuClick}
      showLists={showLists}
      handleCreateList={handleCreateList}
      recentLists={titleToIdList}
    />
  )
}
