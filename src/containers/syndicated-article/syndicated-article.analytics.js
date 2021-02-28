import ReactGA from 'react-ga'
import { legacyAnalyticsTrack } from 'common/api/legacy-analytics'
import { sendCustomSnowplowEvent } from 'common/api/snowplow-analytics'
import { createUiEntity } from 'connectors/snowplow/entities'
import { createContentEntity } from 'connectors/snowplow/entities'
import { UI_COMPONENT_BUTTON } from 'connectors/snowplow/entities'
import { createEngagementEvent } from 'connectors/snowplow/events'
import { ENGAGEMENT_TYPE_SAVE } from 'connectors/snowplow/events'

// common params used for a number of events in this view
function getBaseParams() {
  return {
    action: 'pv_wt',
    view: 'web',
    section: 'syndicated',
    page: window.location.pathname + window.location.search
  }
}

export function trackPageView() {
  legacyAnalyticsTrack({
    ...getBaseParams(),
    type_id: 'view'
  })
}

export function trackShareClick(service) {
  ReactGA.event({
    category: 'Storypage',
    action: 'Clicked Share Button',
    label: service,
    nonInteraction: true
  })
}

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

export function trackEmailImpression(formId) {
  legacyAnalyticsTrack({
    ...getBaseParams(),
    identifier: 'newsletter_email',
    type_id: 'view',
    extra_content: formId
  })
}

export function trackEmailInputFocus(formId) {
  legacyAnalyticsTrack({
    ...getBaseParams(),
    identifier: 'newsletter_email_focus',
    type_id: 'click',
    extra_content: formId
  })
}

export function trackEmailSubmit(formId) {
  legacyAnalyticsTrack({
    ...getBaseParams(),
    identifier: 'newsletter_email_submit',
    type_id: 'click',
    extra_content: formId
  })
}

export function trackEmailSubmitSuccess(formId) {
  legacyAnalyticsTrack({
    ...getBaseParams(),
    identifier: 'newsletter_email_success',
    type_id: 'interact',
    extra_content: formId
  })

  ReactGA.event({
    category: 'Storypage',
    action: 'Newsletter Signup',
    label: 'Pocket Hits',
    value: 1,
    nonInteraction: false
  })
}

export function trackEmailSubmitFailure(formId) {
  legacyAnalyticsTrack({
    ...getBaseParams(),
    identifier: 'newsletter_email_error_submission',
    type_id: 'interact',
    extra_content: formId
  })
}

export function trackEmailValidationError(formId) {
  legacyAnalyticsTrack({
    ...getBaseParams(),
    identifier: 'newsletter_email_error_validation',
    type_id: 'interact',
    extra_content: formId
  })
}

export function trackEmailDismiss(formId) {
  legacyAnalyticsTrack({
    ...getBaseParams(),
    identifier: 'newsletter_email_dismiss',
    type_id: 'click',
    extra_content: formId
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

export function sendSaveToSnowplow({ identifier, itemId, url }) {
  const snowplowEvent = createEngagementEvent(ENGAGEMENT_TYPE_SAVE)

  const uiEntity = createUiEntity({
    type: UI_COMPONENT_BUTTON,
    hierarchy: 0,
    identifier
  })

  const contentEntity = createContentEntity(url, itemId)

  const snowplowEntities = [uiEntity, contentEntity]

  sendCustomSnowplowEvent(snowplowEvent, snowplowEntities)
}
