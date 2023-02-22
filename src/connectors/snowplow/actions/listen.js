export const listenActions = {
  'listen.play': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url']
  },
  'listen.pause': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url']
  },
  'listen.rate': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'value']
  },
  'listen.end': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url']
  },
  'listen.signup': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    }
  }
}
