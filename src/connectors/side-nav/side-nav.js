import { SideNav as SideNavComponent } from 'components/side-nav/side-nav'
import { useSelector } from 'react-redux'
export function SideNav({ subset, isLoggedIn, tag }) {
  const pinnedTags = useSelector((state) => state.userTags.pinnedTags)
  return (
    <SideNavComponent
      subset={subset}
      isLoggedIn={isLoggedIn}
      pinnedTags={pinnedTags}
      tag={tag}
    />
  )
}
