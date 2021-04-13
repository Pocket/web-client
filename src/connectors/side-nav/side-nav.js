import { SideNav as SideNavComponent } from 'components/side-nav/side-nav'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
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
  const pinnedTags = useSelector((state) => state.userTags.pinnedTags)
  const appMode = useSelector((state) => state?.app?.mode)
  const featureState = useSelector((state) => state.features)
  const showCollections = featureFlagActive({ flag: 'shared.lists', featureState }) //prettier-ignore
  const showHome = featureFlagActive({ flag: 'home.retention', featureState })

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
      tag={tag}
      showHome={showHome}
      showSharedLists={showCollections}
      flagsReady={flagsReady}
      trackMenuClick={trackMenuClick}
    />
  )
}
