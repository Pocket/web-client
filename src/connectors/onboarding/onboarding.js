import { useSelector } from 'react-redux'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

import { HomeFlyawaySave } from './messages/home-flyaway-save'
import { HomeFlyawayMyList } from './messages/home-flyaway-my-list'
import { MyListFlyawayReader } from './messages/my-list-flyaway-reader'
import { MyListFlyawayExtensions } from './messages/my-list-flyaway-extensions'
import { ReaderFlyawayApps } from './messages/reader-flyaway-apps'

export const Onboarding = ({ type, ...rest }) => {
  const featureState = useSelector((state) => state.features)
  const onboardingDev = featureFlagActive({ flag: 'onboarding.dev', featureState })
  const onboardingRollout = featureFlagActive({ flag: 'onboarding.rollout', featureState })
  const settingsFetched = useSelector((state) => state.settings.settingsFetched)
  const inGetStartedTest = featureFlagActive({ flag: 'getstarted', featureState })
  const showOnboarding =
    (onboardingDev || onboardingRollout) && settingsFetched && !inGetStartedTest

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
