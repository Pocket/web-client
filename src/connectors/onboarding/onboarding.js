import { useSelector } from 'react-redux'
import { eligibleUser } from 'common/utilities/account/eligible-user'
import { START_DATE_FOR_ONBOARDING } from 'common/constants'

import { HomeFlyawaySave } from './messages/home-flyaway-save'
import { HomeFlyawayMyList } from './messages/home-flyaway-my-list'
import { MyListFlyawayReader } from './messages/my-list-flyaway-reader'
import { MyListFlyawayExtensions } from './messages/my-list-flyaway-extensions'
import { ReaderFlyawayApps } from './messages/reader-flyaway-apps'

export const Onboarding = ({ type, ...rest }) => {
  const userBirth = useSelector((state) => state.user.birth)
  const settingsFetched = useSelector((state) => state.settings.settingsFetched)
  const eligible = eligibleUser(userBirth, START_DATE_FOR_ONBOARDING)
  const showOnboarding = settingsFetched && eligible

  const onboardingTypes = {
    'home.flyaway.save': HomeFlyawaySave,
    'home.flyaway.my-list': HomeFlyawayMyList,
    'my-list.flyaway.reader': MyListFlyawayReader,
    'my-list.flyaway.extensions': MyListFlyawayExtensions,
    'reader.flyaway.apps': ReaderFlyawayApps
  }

  const OnboardingComponent = onboardingTypes[type]

  return showOnboarding ? <OnboardingComponent {...rest} /> : null
}
