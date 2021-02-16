import { SideNav as SideNavComponent } from 'components/side-nav/side-nav'
import { useSelector } from 'react-redux'
export function SideNav({ subset, isLoggedIn, tag }) {
  const pinnedTags = useSelector((state) => state.userTags.pinnedTags)
  const appMode = useSelector((state) => state?.app?.mode)
  const showHome = useSelector((state) => state.features['temp.web.client.home.new_user'])
  const isDisabled = appMode === 'bulk'
  return (
    <SideNavComponent
      isDisabled={isDisabled}
      subset={subset}
      isLoggedIn={isLoggedIn}
      pinnedTags={pinnedTags}
      tag={tag}
      showHome={showHome}
    />
  )
}
