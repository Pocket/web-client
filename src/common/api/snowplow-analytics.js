// functions here assume snowplow has already been loaded in, e.g. for automatic tracking

/**
 * Send a custom event to Snowplow
 *
 * Likely formatted from one of the following utilities, so far:
 *   - src/common/snowplow/events/[ event ].js
 *   - src/common/snowplow/entities/[ entity ].js
 *
 * @param {Object} snowplowEvent - self-describing JSON detailing the user event
 * @param {Object[]} [snowplowEntities=[]] - self-describing JSON detailing the context in which the event happened
 */
export const sendCustomSnowplowEvent = (
  snowplowEvent,
  snowplowEntities = []
) => {
  try {
    global.snowplow('trackSelfDescribingEvent', snowplowEvent, snowplowEntities)
  } catch {
    console.warn('snowplow library is not available')
  }
}

export const snowplowTrackPageView = () => {
  try {
    global.snowplow('trackPageView')
  } catch {
    console.warn('snowplow library is not available')
  }
}

export const SCHEMA_VENDOR = 'com.pocket'

// iglu: vendor_name / event_name / jsonschema / schema version
// these details can be found on the schema definition itself, under the `self` key
export const getSchemaUri = (eventName, schemaVersion = '1-0-0') =>
  `iglu:${SCHEMA_VENDOR}/${eventName}/jsonschema/${schemaVersion}`
