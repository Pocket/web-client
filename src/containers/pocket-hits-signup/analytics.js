import { legacyAnalyticsTrack } from 'common/api/_legacy/legacy-analytics'
import ReactGA from 'react-ga'
import { sendCustomSnowplowEvent } from 'common/api/snowplow-analytics'
import { createObjectUpdateEvent } from 'common/snowplow/events'
import { createNewsletterSubscriberEntity } from 'common/snowplow/entities'

// common params used for any event in this view
const baseParams = {
  view: 'web',
  section: 'syndicated',
  page: global.location ? global.location.pathname : null
}

export function trackPageView() {
  legacyAnalyticsTrack({
    ...baseParams,
    type_id: 'view'
  })
}

export function trackEmailInputFocus(formId) {
  legacyAnalyticsTrack({
    ...baseParams,
    identifier: 'newsletter_email_focus',
    type_id: 'click',
    extra_content: formId
  })
}

export function trackEmailCheckboxClick(formId) {
  legacyAnalyticsTrack({
    ...baseParams,
    identifier: 'newsletter_email_checkbox',
    type_id: 'click',
    extra_content: formId
  })
}

export function trackEmailSubmit(formId) {
  legacyAnalyticsTrack({
    ...baseParams,
    identifier: 'newsletter_email_submit',
    type_id: 'click',
    extra_content: formId
  })
}

export function trackEmailSubmitSuccess(formId) {
  legacyAnalyticsTrack({
    ...baseParams,
    identifier: 'newsletter_email_success',
    type_id: 'interact',
    extra_content: formId
  })

  ReactGA.event({
    category: 'Marketing page',
    action: 'Newsletter Signup',
    label: 'Pocket Hits',
    value: 1,
    nonInteraction: false
  })
}

export function trackEmailSubmitFailure(formId) {
  legacyAnalyticsTrack({
    ...baseParams,
    identifier: 'newsletter_email_error',
    type_id: 'interact',
    extra_content: formId
  })
}

export function sendToSnowplow({ email, language }) {
  const snowplowEvent = createObjectUpdateEvent({
    object: 'newsletter_subscriber',
    trigger: 'newsletter_signup'
  })
  const newsletterSubscriberEntity = createNewsletterSubscriberEntity({ email, language })
  const snowplowEntities = [newsletterSubscriberEntity]

  sendCustomSnowplowEvent(snowplowEvent, snowplowEntities)
}
