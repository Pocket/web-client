import { getSchemaUri } from 'connectors/snowplow/snowplow.utilities'

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
