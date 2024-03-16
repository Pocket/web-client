import { useEffect } from 'react'
import { SideNav as SideNavComponent } from 'components/side-nav/side-nav'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { mutateListCreate } from 'connectors/lists/mutation-create.state'
import { getRecentListsAction } from 'containers/lists/lists.state'

export function SideNav({ type, subset, isLoggedIn, tag, disableSideNav }) {
  const dispatch = useDispatch()

  const flagsReady = useSelector((state) => state.features.flagsReady)
  const pinnedTags = useSelector((state) => state.settings.pinnedTags)
  const pinnedTopics = useSelector((state) => state.settings.pinnedTopics)
  const appMode = useSelector((state) => state?.app?.mode)
  const titleToIdList = useSelector((state) => state.pageListsInfo.titleToIdList)

  useEffect(() => {
    dispatch(getRecentListsAction())
  }, [dispatch])

  const trackMenuClick = (label) => dispatch(sendSnowplowEvent('side-nav', { label }))
  const handleCreateList = () => {
    dispatch(sendSnowplowEvent('shareable-list.create.sidebar'))
    dispatch(mutateListCreate())
  }

  const isDisabled = disableSideNav || appMode === 'bulk'

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
      handleCreateList={handleCreateList}
      recentLists={titleToIdList}
    />
  )
}
