import { SideNav as SideNavComponent } from 'components/side-nav/side-nav'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export function SideNav({ type, subset, isLoggedIn, tag }) {
  const dispatch = useDispatch()

  const flagsReady = useSelector((state) => state.features.flagsReady)
  const pinnedTags = useSelector((state) => state.settings.pinnedTags)
  const pinnedTopics = useSelector((state) => state.settings.pinnedTopics)
  const appMode = useSelector((state) => state?.app?.mode)
  const featureState = useSelector((state) => state.features)
  const inListsExperiment = featureFlagActive({ flag: 'shared-lists', featureState })

  const trackMenuClick = (label) => dispatch(sendSnowplowEvent('side-nav', { label }))

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
    />
  )
}
