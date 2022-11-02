import { SideNav as SideNavComponent } from 'components/side-nav/side-nav'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export function SideNav({ type, subset, isLoggedIn, tag }) {
  const dispatch = useDispatch()

  const flagsReady = useSelector((state) => state.features.flagsReady)
  const pinnedTags = useSelector((state) => state.settings.pinnedTags)
  const pinnedTopics = useSelector((state) => state.settings.pinnedTopics)
  const newSaveCount = useSelector((state) => state.home.newSaves)
  const appMode = useSelector((state) => state?.app?.mode)

  const trackMenuClick = (label) => dispatch(sendSnowplowEvent('side-nav', { label }))

  const isDisabled = appMode === 'bulk'

  const pinTypes = {
    home: pinnedTopics,
    'saves': pinnedTags
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
      newSaveCount={newSaveCount}
      flagsReady={flagsReady}
      trackMenuClick={trackMenuClick}
    />
  )
}
