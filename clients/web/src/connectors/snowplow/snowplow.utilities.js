import { SNOWPLOW_SCHEMA_VENDOR } from 'common/constants'

// iglu: vendor_name / event_name / jsonschema / schema version
// these details can be found on the schema definition itself, under the `self` key
export const getSchemaUri = (eventName, schemaVersion = '1-0-0') =>
  `iglu:${SNOWPLOW_SCHEMA_VENDOR}/${eventName}/jsonschema/${schemaVersion}`
