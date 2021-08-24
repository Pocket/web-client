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
      component: 'ui',
      uiType: 'dialog'
    },
  },
  'onboarding.flyaway.save.close': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
  },
  'onboarding.flyaway.my-list.impression': {
    eventType: 'impression',
    entityTypes: ['ui'],
    eventData: {
      component: 'ui',
      uiType: 'dialog'
    },
  },
  'onboarding.flyaway.my-list.close': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
  },
  'onboarding.flyaway.reader.impression': {
    eventType: 'impression',
    entityTypes: ['ui'],
    eventData: {
      component: 'ui',
      uiType: 'dialog'
    },
  },
  'onboarding.flyaway.reader.close': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
  },
  'onboarding.flyaway.apps.impression': {
    eventType: 'impression',
    entityTypes: ['ui'],
    eventData: {
      component: 'ui',
      uiType: 'dialog'
    },
  },
  'onboarding.flyaway.apps.close': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
  },
  'onboarding.flyaway.apps.apple-badge.open': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
  },
  'onboarding.flyaway.apps.google-play-badge.open': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
  }
}
