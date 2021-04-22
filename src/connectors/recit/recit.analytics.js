import ReactGA from 'react-ga'
import { v4 as uuid } from 'uuid'
import { legacyAnalyticsTrack } from 'common/api/legacy-analytics'

import { trackItemAction } from 'connectors/snowplow/snowplow.state'
import { trackItemSave } from 'connectors/snowplow/snowplow.state'
import { trackItemOpen } from 'connectors/snowplow/snowplow.state'
import { trackItemImpression } from 'connectors/snowplow/snowplow.state'
import { IMPRESSION_COMPONENT_CARD } from 'connectors/snowplow/events'
import { IMPRESSION_REQUIREMENT_VIEWABLE } from 'connectors/snowplow/events'

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

export function trackRecClick({ model, recId, articleId, position, resolvedId, module, location }) {
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

export const readerRecImpressionEvent = (item, position) =>
  trackItemImpression(position, item, 'reader.rec.impression')

export const readerRecSaveEvent = (item, position) =>
  trackItemSave(position, item, 'reader.rec.save')

export const readerRecEngagementEvent = (item, position) =>
  trackItemAction(position, item, 'reader.rec.click')

export const readerRecOpenEvent = (item, position) =>
  trackItemOpen(position, item, 'reader.rec.open')
