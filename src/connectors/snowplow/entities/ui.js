import { getSchemaUri } from 'common/api/snowplow-analytics'
import { getObjectWithValidKeysOnly } from 'common/utilities'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/c03c4f335d10a96c746b17e5271cd7760f2bb114973dbde0355d08881344abd5
 */
const UI_SCHEMA_URL = getSchemaUri('ui')

export const UI_COMPONENT_BUTTON = 'button'
export const UI_COMPONENT_DIALOG = 'dialog'
export const UI_COMPONENT_MENU = 'menu'
export const UI_COMPONENT_CARD = 'card'
export const UI_COMPONENT_LIST = 'list'
export const UI_COMPONENT_SCREEN = 'screen'

/**
 * Entity to describe a front-end user interface. Should be included with any impression, engagement, or custom engagement events.
 *
 * @param type {(
        UI_COMPONENT_BUTTON,
        UI_COMPONENT_DIALOG,
        UI_COMPONENT_MENU,
        UI_COMPONENT_CARD ,
        UI_COMPONENT_LIST,
        UI_COMPONENT_SCREEN)} - The general UI component type @required
 * @param componentDetail {String} - The detailed type of UI component (e.g. standard, radio, checkbox, etc)
 * @param hierarchy {Int} - The order of the UI stack, with 0 being the component directly engaged with @required
 * @param identifier {String} - The internal name for the specific UI @required
 * @param label {String} - The en-US display name for the UI, if available
 * @param index {Int} - The zero-based index value of a UI, if found in a list of similar UI components (e.g. item in a feed)
 * @param value {String} - The state of a UI element before the engagement (e.g. the initial value for a setting or filter)
 * @returns {{schema: *, data: {item_id: number, url: *}}|void}
 */
const createUiEntity = ({
  type,
  componentDetail,
  hierarchy,
  identifier,
  label,
  index,
  value
}) => ({
  schema: UI_SCHEMA_URL,
  data: getObjectWithValidKeysOnly({
    type,
    component_detail: componentDetail,
    hierarchy,
    identifier,
    label,
    index,
    value
  })
})

export default createUiEntity
