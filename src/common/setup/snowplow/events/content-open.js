import { getSchemaUri } from 'common/api/snowplow-analytics'

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
const createContentOpenEvent = (destination, trigger) => ({
  schema: CONTENT_OPEN_SCHEMA_URL,
  data: {
    destination,
    trigger
  }
})

export default createContentOpenEvent
