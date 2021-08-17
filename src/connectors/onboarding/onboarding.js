import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

import { HomeWelcomeModal } from './messages/home-welcome-modal'
import { HomeFlyawaySave } from './messages/home-flyaway-save'
import { HomeFlyawayMyList } from './messages/home-flyaway-my-list'

export const Onboarding = ({ type, ...rest }) => {
  const translations = useTranslation()
  const { i18n } = translations
  const { language: currentLanguage } = i18n

  const featureState = useSelector((state) => state.features)
  const onboardingDev = featureFlagActive({ flag: 'onboarding.dev', featureState })
  const onboardingRelease = featureFlagActive({ flag: 'onboarding.release', featureState })
  const enrolled = onboardingDev || onboardingRelease
  const showOnboarding = currentLanguage === 'en' && enrolled

  const onboardingTypes = {
    'home.modal': HomeWelcomeModal,
    'home.flyaway.save': HomeFlyawaySave,
    'home.flyaway.my-list': HomeFlyawayMyList
  }

  const OnboardingComponent = onboardingTypes[type]

  return showOnboarding ? <OnboardingComponent {...rest} /> : null
}
