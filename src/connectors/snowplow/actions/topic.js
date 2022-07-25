export const topicActions = {
  'topic-page.rail.topic.click': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['label'],
    description:
      'Fired when a user clicks a topic in the `Discover More Topics` section in the right rail'
  },
  'topic-page.bottom.topic.click': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['label'],
    description:
      'Fired when a user clicks a topic in the `Discover More Topics` section at the bottom of the page'
  },
  'topic-collection.rail.topic.click': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['label'],
    description:
      'Fired when a user clicks a topic in the `Discover More Topics` section in the right rail'
  },
  'topic-collection.bottom.topic.click': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['label'],
    description:
      'Fired when a user clicks a topic in the `Discover More Topics` section at the bottom of the page'
  }
}
