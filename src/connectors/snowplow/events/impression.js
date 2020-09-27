import { getSchemaUri } from 'common/api/snowplow-analytics'

const IMPRESSION_SCHEMA_URL = getSchemaUri('impression')

export const IMPRESSION_COMPONENT_UI = 'ui'
export const IMPRESSION_COMPONENT_CARD = 'card'
export const IMPRESSION_COMPONENT_CONTENT = 'content'
export const IMPRESSION_COMPONENT_SCREEN = 'screen'

export const IMPRESSION_REQUIREMENT_INSTANT = 'instant'
export const IMPRESSION_REQUIREMENT_VIEWABLE = 'viewable'

/**
 * Event triggered when a user views a UI element. Entities included: always api_user, user, ui; sometimes content, ad
 *
 * @param component {(
        IMPRESSION_COMPONENT_UI,
        IMPRESSION_COMPONENT_CARD,
        IMPRESSION_COMPONENT_CONTENT,
        IMPRESSION_COMPONENT_SCREEN
        )} - Indicator of the component that is being viewed @required
 * @param requirement {(
        IMPRESSION_REQUIREMENT_INSTANT,
        IMPRESSION_REQUIREMENT_VIEWABLE
        )} - Indicates the requirement before an impression can be triggered
 (instant: any pixel displayed on screen; viewable: +50% of component
 displayed for 1+ seconds)
 * @returns {{schema: *, data: {component: *, requirement: *}}} @required
 */
const createImpressionEvent = (component, requirement) => ({
  schema: IMPRESSION_SCHEMA_URL,
  data: {
    component,
    requirement
  }
})

export default createImpressionEvent
