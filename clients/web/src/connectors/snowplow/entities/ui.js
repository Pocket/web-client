import { getSchemaUri } from 'connectors/snowplow/snowplow.utilities'
import { getObjectWithValidKeysOnly } from 'common/utilities/object-array/object-array'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/c03c4f335d10a96c746b17e5271cd7760f2bb114973dbde0355d08881344abd5
 */
const UI_SCHEMA_URL = getSchemaUri('ui', '1-0-2')

export const UI_COMPONENT_BUTTON = 'button'
export const UI_COMPONENT_DIALOG = 'dialog'
export const UI_COMPONENT_MENU = 'menu'
export const UI_COMPONENT_CARD = 'card'
export const UI_COMPONENT_LIST = 'list'
export const UI_COMPONENT_SCREEN = 'screen'
export const UI_COMPONENT_READER = 'reader'
export const UI_COMPONENT_PAGE = 'page'
export const UI_COMPONENT_LINK = 'link'

/**
 * Entity to describe a front-end user interface. Should be included with any impression, engagement, or custom engagement events.
 *
 * @param uiType {(
        UI_COMPONENT_BUTTON,
        UI_COMPONENT_DIALOG,
        UI_COMPONENT_MENU,
        UI_COMPONENT_CARD ,
        UI_COMPONENT_LIST,
        UI_COMPONENT_SCREEN,
        UI_COMPONENT_READER,
        UI_COMPONENT_PAGE,
        UI_COMPONENT_LINK)} - The general UI component type @required
 * @param componentDetail {String} - The detailed type of UI component (e.g. standard, radio, checkbox, etc)
 * @param hierarchy {Int} - The order of the UI stack, with 0 being the component directly engaged with @required
 * @param identifier {String} - The internal name for the specific UI @required
 * @param label {String} - The en-US display name for the UI, if available
 * @param position {Int} - The zero-based index value of a UI, if found in a list of similar UI components (e.g. item in a feed)
 * @param value {String} - The state of a UI element before the engagement (e.g. the initial value for a setting or filter)
 * @returns {{schema: *, data: {item_id: number, url: *}}|void}
 */
const createUiEntity = ({
  uiType,
  componentDetail,
  hierarchy = 0,
  identifier,
  label,
  position,
  value
}) => ({
  schema: UI_SCHEMA_URL,
  data: getObjectWithValidKeysOnly({
    type: uiType,
    component_detail: componentDetail,
    hierarchy,
    identifier,
    label,
    index: position,
    value
  })
})

export default createUiEntity
