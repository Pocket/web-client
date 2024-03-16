import { getSchemaUri } from 'connectors/snowplow/snowplow.utilities'
import { getObjectWithValidKeysOnly } from 'common/utilities/object-array/object-array'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/2f56902d3fb80ca6f5dcb8aed41cdadac4173e2e884214917751710439ff8a09
 */
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
  data: getObjectWithValidKeysOnly({
    object_version: objectVersion,
    frequency,
    email,
    newsletter: `pocket_hits_${filterLocale(locale)}`
  })
})

export default createNewsletterSubscriberEntity
