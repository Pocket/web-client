import { legacyAnalyticsTrack } from 'common/api/legacy-analytics'

// common params used for any event in this view
const topic = global?.location?.pathname.match(/\/explore\/(.*)(\?.*)?/)

const baseParams = {
  view: 'web',
  section: 'topics',
  page: global?.location?.pathname,
  extra_content: topic ? topic[1] : false
}

export function trackPageView() {
  legacyAnalyticsTrack({
    ...baseParams,
    type_id: 'view'
  })
}

export function trackItemImpression(cxt_item_position) {
  legacyAnalyticsTrack({
    ...baseParams,
    cxt_item_position,
    type_id: 'view'
  })
}

export function trackItemOpen(cxt_item_position) {
  legacyAnalyticsTrack({
    ...baseParams,
    identifier: 'click_item',
    type_id: 'click',
    cxt_item_position
  })
}

export function trackUnAuthSave(cxt_item_position) {
  legacyAnalyticsTrack({
    ...baseParams,
    cxt_item_position,
    identifier: 'click_save',
    type_id: 'click'
  })
}

export function getItemSaveAnalytics(cxt_item_position) {
  return {
    ...baseParams,
    cxt_item_position
  }
}

export function trackTopicClick(topicId, topicIndex, topicsNavId) {
  // analytics expects a 1-based position
  const topicPosition = Number.isInteger(topicIndex)
    ? topicIndex + 1
    : undefined
  let analyticsNavId

  // map the component id for the `TopicsPillbox` to what analytics expects
  // for the extra_int_data param
  switch (topicsNavId) {
    case 'right-rail-topics':
      analyticsNavId = 1
      break
    case 'page-bottom-topics':
      analyticsNavId = 2
      break
    default:
  }

  legacyAnalyticsTrack({
    ...baseParams,
    identifier: 'click_topic',
    type_id: 'click',
    extra_int_data: analyticsNavId,
    cxt_item_position: topicPosition,
    extra_content: topicId
  })
}
