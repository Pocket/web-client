export const onboardingActions = {
  'onboarding.welcome.close': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    }
  },
  'onboarding.welcome.continue': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    }
  },
  'onboarding.welcome.skip': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    }
  },
  'onboarding.welcome.impression': {
    eventType: 'impression',
    entityTypes: ['ui'],
    eventData: {
      component: 'ui',
      uiType: 'dialog'
    }
  },
  'onboarding.topic.toggle': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['label']
  },
  'onboarding.flyaway.save.impression': {
    eventType: 'impression',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
  },
  'onboarding.flyaway.save.close': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
  }
}
