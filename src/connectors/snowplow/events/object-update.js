import { getSchemaUri } from 'connectors/snowplow/snowplow.utilities'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/a30c8f05ecf12d2b53202ed1cf161a4c578fab653f846550a20392659449dbad
 */
const OBJECT_UPDATE_SCHEMA_URL = getSchemaUri('object_update', '1-0-5')

/**
 * Event triggered when the backend updates the properties of an object.
 * Entities included: a new and an old entity for the object being updated,
 * api_user, and [sometimes] user.
 *
 * @param object {string} - The name of the entity being updated @required
 * @param trigger {string} - The backend action taken that triggers the object update @required
 */
const createObjectUpdateEvent = ({ object, trigger }) => ({
  schema: OBJECT_UPDATE_SCHEMA_URL,
  data: {
    object,
    trigger
  }
})

export default createObjectUpdateEvent
