import { SideNav as SideNavComponent } from 'components/side-nav/side-nav'
import { useSelector } from 'react-redux'

export function SideNav({ subset, isLoggedIn, tag }) {
  const flagsReady = useSelector((state) => state.features.flagsReady)
  const pinnedTags = useSelector((state) => state.userTags.pinnedTags)
  const appMode = useSelector((state) => state?.app?.mode)
  const inHomeTest = useSelector((state) => state.features['home.new_user'])?.assigned //prettier-ignore
  const showHome = inHomeTest

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
