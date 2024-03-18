/**
 *  This file aims to help users create valid Events (as self-describing JSON) to send to Snowplow via
 *  Snowplow's `selfDescribingEvent` API: https://github.com/snowplow/snowplow/wiki/2-Specific-event-tracking-with-the-Javascript-tracker#371-trackselfdescribingevent
 *
 * Each Event maps to a schema, defined and hosted by the Pocket data team.
 * Each Event references the schema its `data` key is
 * abiding by. This pattern allows Snowplow to validate incoming events as valid
 * or invalid, guaranteeing our prod data only contains valid data, and invalid
 * events can be queried separately.
 *
 * Sample self-describing JSON:
 * {
 *   schema: [ schema URI ],
 *   data: {
 *     key1: value1, // key name, value type, whether-optional, are defined in the
 *      schema that schema URI points to
 *     key2: value2
 *   }
 * }
 *
 * For these, we bias to not send a key with `null` value. Instead, data
 * team prefers we omit the key altogether. For required keys, a value must be sent.
 */

export {
  default as createEngagementEvent,
  ENGAGEMENT_TYPE_GENERAL,
  ENGAGEMENT_TYPE_REPORT,
  ENGAGEMENT_TYPE_SAVE
} from './engagement'

export {
  default as createContentOpenEvent,
  CONTENT_OPEN_TRIGGER_CLICK,
  CONTENT_OPEN_TRIGGER_AUTO,
  CONTENT_OPEN_DESTINATION_INTERNAL,
  CONTENT_OPEN_DESTINATION_EXTERNAL
} from './content-open'

export {
  default as createImpressionEvent,
  IMPRESSION_COMPONENT_UI,
  IMPRESSION_COMPONENT_CARD,
  IMPRESSION_COMPONENT_CONTENT,
  IMPRESSION_COMPONENT_SCREEN,
  IMPRESSION_REQUIREMENT_INSTANT,
  IMPRESSION_REQUIREMENT_VIEWABLE
} from './impression'

export { default as createObjectUpdateEvent } from './object-update'
export { default as createVariantEnrollEvent } from './variant-enroll'
