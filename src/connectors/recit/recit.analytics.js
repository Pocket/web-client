import ReactGA from 'react-ga'
import { v4 as uuid } from 'uuid'
import { legacyAnalyticsTrack } from 'common/api/legacy-analytics'

import { trackContentEngagement } from 'connectors/snowplow/snowplow.state'
import { trackContentOpen } from 'connectors/snowplow/snowplow.state'
import { trackContentImpression } from 'connectors/snowplow/snowplow.state'
import { ENGAGEMENT_TYPE_GENERAL } from 'connectors/snowplow/events'
import { ENGAGEMENT_TYPE_SAVE } from 'connectors/snowplow/events'
import { IMPRESSION_COMPONENT_CARD } from 'connectors/snowplow/events'
import { IMPRESSION_REQUIREMENT_VIEWABLE } from 'connectors/snowplow/events'
import { CONTENT_OPEN_TRIGGER_CLICK } from 'connectors/snowplow/events'
import { UI_COMPONENT_BUTTON } from 'connectors/snowplow/entities'
import { getLinkOpenTarget } from 'connectors/snowplow/events'

export const PUBLISHER_MODULE = 'syndicated_publisher'
export const POCKET_MODULE = 'syndicated_article'

let PAGE_LOAD_ID = uuid()

export function trackRecImpression({
  model,
  recId,
  articleId,
  position,
  resolvedId,
  module,
  location
}) {
  legacyAnalyticsTrack({
    time: Math.round(new Date() / 1000), // unix timestamp
    action: 'pv_wt',
    view: 'syndicated_rec_test',
    cxt_page_load_id: PAGE_LOAD_ID,
    cxt_model: model,
    cxt_rec_id: recId,
    cxt_synd_id: articleId,
    cxt_position: position,
    cxt_rec_item_id: resolvedId,
    cxt_module: module,
    type_id: 0
  })

  ReactGA.event({
    category: 'Storypage',
    action: 'Viewed Recommendation',
    label: `${location} - ${position}`,
    nonInteraction: true
  })
}

export function trackRecClick({
  model,
  recId,
  articleId,
  position,
  resolvedId,
  module,
  location
}) {
  legacyAnalyticsTrack({
    time: Math.round(new Date() / 1000), // unix timestamp
    action: 'pv_wt',
    view: 'syndicated_rec_test',
    cxt_page_load_id: PAGE_LOAD_ID,
    cxt_model: model,
    cxt_rec_id: recId,
    cxt_synd_id: articleId,
    cxt_position: position,
    cxt_rec_item_id: resolvedId,
    cxt_module: module,
    type_id: 1
  })

  ReactGA.event({
    category: 'Storypage',
    action: 'Clicked Recommendation',
    label: `${location} - ${position}`,
    nonInteraction: true
  })
}


export const readerRecImpressionEvent = (item, position) => (trackContentImpression(
  IMPRESSION_COMPONENT_CARD,
  IMPRESSION_REQUIREMENT_VIEWABLE,
  position,
  item,
  'reader.rec.impression'
))

export const readerRecSaveEvent = (item, position) => (trackContentEngagement(
  ENGAGEMENT_TYPE_SAVE,
  UI_COMPONENT_BUTTON,
  position,
  item,
  'reader.rec.save'
))

export const readerRecEngagementEvent = (item, position) => (trackContentEngagement(
  ENGAGEMENT_TYPE_GENERAL,
  UI_COMPONENT_BUTTON,
  position,
  item,
  'reader.rec.click'
))

export const readerRecOpenEvent = (item, position) => {
  const destination = getLinkOpenTarget(item?.save_url, item?.syndicated)

  return trackContentOpen(
    destination,
    CONTENT_OPEN_TRIGGER_CLICK,
    position,
    item,
    'reader.rec.open'
  )
}
