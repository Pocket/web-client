import { getSchemaUri } from 'connectors/snowplow/snowplow.utilities'

const NEWSLETTER_SUBSCRIBER_SCHEMA_URL = getSchemaUri('newsletter_subscriber', '1-0-2')

/**
 * We currently offer Pocket Hits to `de` or `en` subscribers only. All other
 * locales default to `en`
 */
const filterLocale = (locale) => {
  if (locale.substring(0, 2) === 'de') return 'de'
  return 'en'
}

/**
 * Entity to describe a subscriber to a Pocket newsletter. Expected (new and old)
 * on all object_update events where object = newsletter_subscriber.
 *
 * @param object_version {string} - Indication of whether the version of the entity is before or after the modifications were made @required
 * @param frequency {string} - The frequency list that the email is subscribed to @required
 * @param email {string} - Email address of the newsletter subscriber @required
 * @param newsletter {string} - Name of newsletter that was subscribed to. @required
 */
const createNewsletterSubscriberEntity = ({
  objectVersion = 'new',
  frequency = 'daily',
  email,
  locale = 'en'
}) => ({
  schema: NEWSLETTER_SUBSCRIBER_SCHEMA_URL,
  data: {
    object_version: objectVersion,
    frequency,
    email,
    newsletter: `pocket_hits_${filterLocale(locale)}`
  }
})

export default createNewsletterSubscriberEntity
