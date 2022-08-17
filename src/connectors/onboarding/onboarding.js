import { useSelector } from 'react-redux'
import { eligibleUser } from 'common/utilities/account/eligible-user'
import { START_DATE_FOR_ONBOARDING } from 'common/constants'

import { HomeFlyawaySave } from './messages/home-flyaway-save'
import { HomeFlyawayReader } from './messages/home-flyaway-reader'
import { MyListFlyawayExtensions } from './messages/my-list-flyaway-extensions'
import { ReaderFlyawayApps } from './messages/reader-flyaway-apps'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export const Onboarding = ({ type, ...rest }) => {
  const userBirth = useSelector((state) => state.user.birth)
  const settingsFetched = useSelector((state) => state.settings.settingsFetched)
  const featureState = useSelector((state) => state.features) || {}
  const eligible = eligibleUser(userBirth, START_DATE_FOR_ONBOARDING)
  const setupStatus = useSelector((state) => state.homeSetup.setupStatus)

  const inSetupV3 = featureFlagActive({ flag: 'setup.moment.v3', featureState })
  // If in setup moment, check that the status isn't false. Otherwise it's safe to show
  const postSetupMoment = (inSetupV3) ? !!setupStatus : true

  const showOnboarding = settingsFetched && eligible && postSetupMoment

  const onboardingTypes = {
    'home.flyaway.save': HomeFlyawaySave,
    'home.flyaway.reader': HomeFlyawayReader,
    'my-list.flyaway.extensions': MyListFlyawayExtensions,
    'reader.flyaway.apps': ReaderFlyawayApps
  }

  const OnboardingComponent = onboardingTypes[type]

  return showOnboarding ? <OnboardingComponent {...rest} inSetupV3={inSetupV3} /> : null
}
