import ReactGA from 'react-ga'
import { v4 as uuid } from 'uuid'
import { legacyAnalyticsTrack } from 'common/api/_legacy/legacy-analytics'

export const PUBLISHER_MODULE = 'syndicated_publisher'
export const POCKET_MODULE = 'syndicated_article'

let PAGE_LOAD_ID = uuid()

export function trackPublisherCTAImpression(publisher) {
  ReactGA.event({
    category: 'Storypage',
    action: 'Viewed Publisher CTA',
    label: publisher,
    nonInteraction: true
  })
}

export function trackPublisherCTAClick(publisher) {
  ReactGA.event({
    category: 'Storypage',
    action: 'Clicked Publisher CTA',
    label: publisher,
    nonInteraction: true
  })
}

export function trackEmailSubmitSuccess(formId) {
  ReactGA.event({
    category: 'Storypage',
    action: 'Newsletter Signup',
    label: 'Pocket Hits',
    value: 1,
    nonInteraction: false
  })
}

export function trackScrollDepth(depth) {
  ReactGA.event({
    category: 'Storypage',
    action: 'Scrolled Page',
    label: `${depth}%`,
    nonInteraction: true
  })
}

// ?? Do we need to update this legacy callback?
// ?? AND/OR
// ?? Does this need to be adjusted to accept resolved_url
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

// ?? Do we need to update this legacy callback?
// ?? AND/OR
// ?? Does this need to be adjusted to accept resolved_url
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
