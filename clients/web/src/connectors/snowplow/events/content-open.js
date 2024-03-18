import { getSchemaUri } from 'connectors/snowplow/snowplow.utilities'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/3a2233fd5e719db33bbcaf32aea1026f3709bcba837b0a1f4a7f034e2817c09d
 */
const CONTENT_OPEN_SCHEMA_URL = getSchemaUri('content_open')

export const CONTENT_OPEN_TRIGGER_CLICK = 'click'
export const CONTENT_OPEN_TRIGGER_AUTO = 'auto'

export const CONTENT_OPEN_DESTINATION_INTERNAL = 'internal'
export const CONTENT_OPEN_DESTINATION_EXTERNAL = 'external'

/**
 * Event created when an app initiates the opening a piece of content (triggered
 * by the intent to open an item and does not guarantee that the item was
 * viewed). Entities included: always api_user, user, content; sometimes ui, ad.
 *
 * @param destination {(
            CONTENT_OPEN_DESTINATION_INTERNAL,
            CONTENT_OPEN_DESTINATION_EXTERNAL
          )} - Indicates whether the content is being opened within a Pocket property (internal) or offsite / in another app (external). @required
 * @param trigger  {(
            CONTENT_OPEN_TRIGGER_CLICK,
            CONTENT_OPEN_TRIGGER_AUTO
          )} - Indicates whether content was opened with direct intent (e.g. user taps vs. next-up in Listen playlist or infinite scroll) @required
 * @returns {{schema: *, data: {destination: *, trigger: *}}}
 */
const createContentOpenEvent = ({ destination, trigger = 'click' }) => ({
  schema: CONTENT_OPEN_SCHEMA_URL,
  data: {
    destination,
    trigger
  }
})

export default createContentOpenEvent
