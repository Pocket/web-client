import { useEffect } from 'react'
import { SideNav as SideNavComponent } from 'components/side-nav/side-nav'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { mutateListCreate } from 'connectors/lists/mutation-create.state'
import { getUserShareableLists } from 'containers/lists/lists.state'

export function SideNav({ type, subset, isLoggedIn, tag }) {
  const dispatch = useDispatch()

  const flagsReady = useSelector((state) => state.features.flagsReady)
  const pinnedTags = useSelector((state) => state.settings.pinnedTags)
  const pinnedTopics = useSelector((state) => state.settings.pinnedTopics)
  const appMode = useSelector((state) => state?.app?.mode)
  const inListsExperiment = useSelector((state) => state.pageListsInfo.enrolled)
  const titleToIdList = useSelector((state) => state.pageListsInfo.titleToIdList)

  useEffect(() => {
    if (inListsExperiment) dispatch(getUserShareableLists())
  }, [dispatch, inListsExperiment])  

  const trackMenuClick = (label) => dispatch(sendSnowplowEvent('side-nav', { label }))
  const handleCreateList = () => dispatch(mutateListCreate())

  const isDisabled = appMode === 'bulk'

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
      inListsExperiment={inListsExperiment}
      handleCreateList={handleCreateList}
      recentLists={titleToIdList}
    />
  )
}
