import { SideNav as SideNavComponent } from 'components/side-nav/side-nav'
import { useSelector } from 'react-redux'
import { isEligible } from 'connectors/feature-flags/feature-flags'
import { HOME_TEST_START } from 'common/constants'

export function SideNav({ subset, isLoggedIn, tag }) {
  const flagsReady = useSelector((state) => state.features.flagsReady)
  const pinnedTags = useSelector((state) => state.userTags.pinnedTags)
  const appMode = useSelector((state) => state?.app?.mode)

  const accountBirth = useSelector((state) => state?.user?.birth)
  const inHomeTest = useSelector((state) => state.features['temp.web.client.home.new_user'])?.assigned //prettier-ignore
  const showHome = isEligible(accountBirth, HOME_TEST_START) && inHomeTest

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
