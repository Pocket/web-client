export const discoverActions = {
  'discover.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'recommendation', 'slate', 'slateLineup', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: [
      'id', 'url', 'position', 'destination', 'recommendationId',
      'slateLineupId', 'slateLineupRequestId', 'slateLineupExperiment',
      'slateId', 'slateRequestId', 'slateExperiment'
    ]
  },
  'discover.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'recommendation', 'slate', 'slateLineup', 'ui'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: [
      'id', 'url', 'position', 'recommendationId',
      'slateLineupId', 'slateLineupRequestId', 'slateLineupExperiment',
      'slateId', 'slateRequestId', 'slateExperiment'
    ]
  },
  'discover.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'recommendation', 'slate', 'slateLineup', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: [
      'id', 'url', 'position', 'recommendationId',
      'slateLineupId', 'slateLineupRequestId', 'slateLineupExperiment',
      'slateId', 'slateRequestId', 'slateExperiment'
    ]
  },
  'discover.signup.impression': {
    eventType: 'impression',
    entityTypes: ['ui'],
    eventData: {
      component: 'ui',
      uiType: 'button'
    },
    description: 'Dismissable Signup section in the right side for logged-out users is seen'
  },
  'discover.signup.dismiss': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Dismissable Signup section in the right side for logged-out users is dismissed'
  },
  'discover.signup.click': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Dismissable Signup section in the right side for logged-out users is clicked through'
  },
  'discover.report': {
    eventType: 'engagement',
    entityTypes: ['report', 'content'],
    eventData: {
      engagementType: 'report'
    },
    expects: ['id', 'url', 'reason', 'otherText'],
    description: '`otherText` is an optional field'
  },
}
