/**
 *  This file aims to help users create valid Entities (as self-describing JSON) to send to Snowplow via
 *  Snowplow's `selfDescribingEvent` API: https://github.com/snowplow/snowplow/wiki/2-Specific-event-tracking-with-the-Javascript-tracker#371-trackselfdescribingevent
 *
 * Each Entity maps to a schema, defined and hosted by the Pocket data team.
 * Each Entity references the schema its `data` key is
 * abiding by. This pattern allows Snowplow to validate incoming events as valid
 * or invalid, guaranteeing our prod data only contains valid data, and invalid
 * events can be queried separately.
 *
 * Sample self-describing JSON:
 * {
 *   schema: [ schema URI ]
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

// the actual apiUserEntity is also exported here, because it requires no
// instance parameters
export { default as createApiUserEntity, apiUserEntity } from './api-user'
export { default as createContentEntity } from './content'
export { default as createFeatureFlagEntity } from './feature-flag'
export { default as createNewsletterSubscriberEntity } from './newsletter-subscriber'
export { default as createRecommendationEntity } from './recommendation'
export { default as createCorpusRecommendationEntity } from './corpus-recommendation'
export { default as createReportEntity } from './report'
export { default as createShareableListItemEntity } from './shareable-list-item'
export { default as createShareableListEntity } from './shareable-list'
export { default as createSlateLineupEntity } from './slate-lineup'
export { default as createSlateEntity } from './slate'
export {
  default as createUiEntity,
  UI_COMPONENT_BUTTON,
  UI_COMPONENT_DIALOG,
  UI_COMPONENT_MENU,
  UI_COMPONENT_CARD,
  UI_COMPONENT_LIST,
  UI_COMPONENT_SCREEN,
  UI_COMPONENT_READER,
  UI_COMPONENT_PAGE,
  UI_COMPONENT_LINK
} from './ui'
export { default as createUserEntity } from './user'
