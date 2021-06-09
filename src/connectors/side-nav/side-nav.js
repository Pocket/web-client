import { SideNav as SideNavComponent } from 'components/side-nav/side-nav'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export function SideNav({ subset, isLoggedIn, tag }) {
  const dispatch = useDispatch()

  const flagsReady = useSelector((state) => state.features.flagsReady)
  const pinnedTags = useSelector((state) => state.settings.pinnedTags)
  const pinnedTopics = useSelector((state) => state.settings.pinnedTopics)
  const newSaveCount = useSelector((state) => state.home.newSaves)
  const appMode = useSelector((state) => state?.app?.mode)

  const trackMenuClick = (label) => dispatch(sendSnowplowEvent('side-nav', { label }))

  const isDisabled = appMode === 'bulk'
  return (
    <SideNavComponent
      isDisabled={isDisabled}
      subset={subset}
      isLoggedIn={isLoggedIn}
      pinnedTags={pinnedTags}
      pinnedTopics={pinnedTopics}
      tag={tag}
      newSaveCount={newSaveCount}
      flagsReady={flagsReady}
      trackMenuClick={trackMenuClick}
    />
  )
}
