import { SideNav as SideNavComponent } from 'components/side-nav/side-nav'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { trackEngagement } from 'connectors/snowplow/snowplow.state'
import { ENGAGEMENT_TYPE_GENERAL } from 'connectors/snowplow/events'
import { UI_COMPONENT_MENU } from 'connectors/snowplow/entities'

/* Analytics Event */
export const sendEngagementEvent = (label) =>
  trackEngagement(
    ENGAGEMENT_TYPE_GENERAL,
    UI_COMPONENT_MENU,
    0, // position in list (zero since it's not in list)
    'side-nav',
    label
  )

export function SideNav({ subset, isLoggedIn, tag }) {
  const dispatch = useDispatch()

  const flagsReady = useSelector((state) => state.features.flagsReady)
  const pinnedTags = useSelector((state) => state.settings.pinnedTags)
  const pinnedTopics = useSelector((state) => state.settings.pinnedTopics)
  const newSaveCount = useSelector((state) => state.home.newSaves)
  const appMode = useSelector((state) => state?.app?.mode)

  const trackMenuClick = (label) => {
    dispatch(sendEngagementEvent(label))
  }

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
