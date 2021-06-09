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
  }
}
