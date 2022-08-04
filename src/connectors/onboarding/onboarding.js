import { useSelector } from 'react-redux'
import { eligibleUser } from 'common/utilities/account/eligible-user'
import { START_DATE_FOR_ONBOARDING } from 'common/constants'

import { HomeFlyawaySave } from './messages/home-flyaway-save'
import { HomeFlyawayMyList } from './messages/home-flyaway-my-list'
import { MyListFlyawayReader } from './messages/my-list-flyaway-reader'
import { MyListFlyawayExtensions } from './messages/my-list-flyaway-extensions'
import { ReaderFlyawayApps } from './messages/reader-flyaway-apps'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export const Onboarding = ({ type, ...rest }) => {
  const userBirth = useSelector((state) => state.user.birth)
  const settingsFetched = useSelector((state) => state.settings.settingsFetched)
  const featureState = useSelector((state) => state.features) || {}
  const eligible = eligibleUser(userBirth, START_DATE_FOR_ONBOARDING)

  const inSetupV3 = featureFlagActive({ flag: 'setup.moment.v3', featureState })
  const showOnboarding = settingsFetched && eligible && !inSetupV3

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
