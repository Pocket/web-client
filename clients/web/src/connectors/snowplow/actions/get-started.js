export const getStartedActions = {
  'get-started.topic.toggle': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['label', 'value'],
    description: 'value is either `select` or `deselect` depending on toggle outcome'
  },
  'get-started.topic.skip': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Clicking “Skip” on the `select-topics` page'
  },
  'get-started.topic.continue': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Clicking “Continue” on the `select-topics` page'
  },
  'get-started.topic.update': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Clicking “Update” on the Recommended Reads slate'
  },
  'get-started.topic.dismiss': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Clicking the “X” button at the top of the panel after clicking “Skip”'
  },
  'get-started.topic.reselect': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Clicking the “Continue” button on the panel after clicking “Skip”'
  },
  'get-started.topic.cancel': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Clicking the “Cancel” button when reselecting topics'
  },
  'get-started.reader.gohome': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Click the “Home” button in the toolbar in Reader'
  }
}
