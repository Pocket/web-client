import { getSchemaUri } from 'connectors/snowplow/snowplow.utilities'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/ee6a84772fc144d0e5b58ca5f461ebdccfbab784067c823e4a7a60744dc5235f
 */
const IMPRESSION_SCHEMA_URL = getSchemaUri('impression', '1-0-2')

export const IMPRESSION_COMPONENT_UI = 'ui'
export const IMPRESSION_COMPONENT_CARD = 'card'
export const IMPRESSION_COMPONENT_CONTENT = 'content'
export const IMPRESSION_COMPONENT_SCREEN = 'screen'
export const IMPRESSION_COMPONENT_PUSH_NOTIFICATION = 'push_notification'
export const IMPRESSION_COMPONENT_BUTTON = 'button'

export const IMPRESSION_REQUIREMENT_INSTANT = 'instant'
export const IMPRESSION_REQUIREMENT_VIEWABLE = 'viewable'

/**
 * Event triggered when a user views a UI element. Entities included: always api_user, user, ui; sometimes content, ad
 *
 * @param component {(
        IMPRESSION_COMPONENT_UI,
        IMPRESSION_COMPONENT_CARD,
        IMPRESSION_COMPONENT_CONTENT,
        IMPRESSION_COMPONENT_SCREEN,
        IMPRESSION_COMPONENG_PUSH_NOTIFICATION,
        IMPRESSION_COMPONENT_BUTTON
        )} - Indicator of the component that is being viewed @required
 * @param requirement {(
        IMPRESSION_REQUIREMENT_INSTANT,
        IMPRESSION_REQUIREMENT_VIEWABLE
        )} - Indicates the requirement before an impression can be triggered @required
 (instant: any pixel displayed on screen; viewable: +50% of component
 displayed for 1+ seconds)
 * @returns {{schema: *, data: {component: *, requirement: *}}} @required
 */
const createImpressionEvent = ({ component, requirement = 'viewable' }) => ({
  schema: IMPRESSION_SCHEMA_URL,
  data: {
    component,
    requirement
  }
})

export default createImpressionEvent
