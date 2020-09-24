import ReactGA from 'react-ga'
import { legacyAnalyticsTrack } from 'common/api/legacy-analytics'

// common params used for any event in this view
const baseParams = {
  view: 'web',
  section: 'explore',
  page: '/explore/'
}

export function trackPageView() {
  legacyAnalyticsTrack({
    ...baseParams,
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

export function getItemSaveAnalytics(cxt_item_position) {
  return {
    ...baseParams,
    cxt_item_position
  }
}

export function trackUnAuthSave(cxt_item_position) {
  legacyAnalyticsTrack({
    ...baseParams,
    cxt_item_position,
    identifier: 'click_save',
    type_id: 'click'
  })
}

export function trackItemImpression(cxt_item_position) {
  legacyAnalyticsTrack({
    ...baseParams,
    cxt_item_position,
    type_id: 'view'
  })
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
    case 'page-top-topics':
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

export function trackEmailImpression(formId) {
  legacyAnalyticsTrack({
    ...baseParams,
    action: 'pv_wt',
    identifier: 'newsletter_email',
    type_id: 'view',
    extra_content: formId
  })
}

export function trackEmailInputFocus(formId) {
  legacyAnalyticsTrack({
    ...baseParams,
    action: 'pv_wt',
    identifier: 'newsletter_email_focus',
    type_id: 'click',
    extra_content: formId
  })
}

export function trackEmailSubmit(formId) {
  legacyAnalyticsTrack({
    ...baseParams,
    action: 'pv_wt',
    identifier: 'newsletter_email_submit',
    type_id: 'click',
    extra_content: formId
  })
}

export function trackEmailSubmitSuccess(formId) {
  legacyAnalyticsTrack({
    ...baseParams,
    action: 'pv_wt',
    identifier: 'newsletter_email_success',
    type_id: 'interact',
    extra_content: formId
  })

  ReactGA.event({
    category: 'Explore',
    action: 'Newsletter Signup',
    label: 'Pocket Hits',
    value: 1,
    nonInteraction: false
  })
}

export function trackEmailSubmitFailure(formId) {
  legacyAnalyticsTrack({
    ...baseParams,
    action: 'pv_wt',
    identifier: 'newsletter_email_error_submission',
    type_id: 'interact',
    extra_content: formId
  })
}

export function trackEmailValidationError(formId) {
  legacyAnalyticsTrack({
    ...baseParams,
    action: 'pv_wt',
    identifier: 'newsletter_email_error_validation',
    type_id: 'interact',
    extra_content: formId
  })
}

export function trackSignupCalloutImpression() {
  legacyAnalyticsTrack({
    ...baseParams,
    action: 'pv_wt',
    identifier: 'signup_callout_impression',
    type_id: 'view'
  })
}

export function trackSignupCalloutDismiss() {
  legacyAnalyticsTrack({
    ...baseParams,
    action: 'pv_wt',
    identifier: 'signup_callout_dismiss',
    type_id: 'click'
  })
}

export function trackSignupCalloutComplete() {
  legacyAnalyticsTrack({
    ...baseParams,
    action: 'pv_wt',
    identifier: 'signup_callout_complete',
    type_id: 'click'
  })
}
