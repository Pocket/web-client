import { SideNav as SideNavComponent } from 'components/side-nav/side-nav'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import { useSelector } from 'react-redux'

export function SideNav({ subset, isLoggedIn, tag }) {
  const flagsReady = useSelector((state) => state.features.flagsReady)
  const pinnedTags = useSelector((state) => state.userTags.pinnedTags)
  const appMode = useSelector((state) => state?.app?.mode)
  const featureState = useSelector((state) => state.features)
  const showHome = featureFlagActive({ flag: 'home.new_user', featureState })

  const isDisabled = appMode === 'bulk'
  return (
    <SideNavComponent
      isDisabled={isDisabled}
      subset={subset}
      isLoggedIn={isLoggedIn}
      pinnedTags={pinnedTags}
      tag={tag}
      showHome={showHome}
      flagsReady={flagsReady}
    />
  )
}
