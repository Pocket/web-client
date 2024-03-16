import { getSchemaUri } from 'connectors/snowplow/snowplow.utilities'
import { getObjectWithValidKeysOnly } from 'common/utilities/object-array/object-array'

/**
 * Schema information:
 * https://console.snowplowanalytics.com/cf0fba6b-23b3-49a0-9d79-7ce18b8f9618/data-structures/fd8394a5f1c719c7acee874cfdef276354f0ef96eb46a2c3f2f522c41889398a
 */
const REPORT_SCHEMA_URL = getSchemaUri('report')

/**
 * Entity for a flag from a user to Pocket that an item is inappropriate or broken. Should be included with any engagement event where type = report.
 *
 * @param reason {(
        "broken_meta",
        "wrong_category",
        "sexually_explicit",
        "offensive",
        "misinformation",
        "other"
      )} - The reason for the report selected from a list of options. @required
 * @param otherText {string} - An optional user-provided comment on the reason for the report. @optional
 * @returns {{schema: *, data: {reason: string, ?comment: string}}}
 */
const createReportEntity = ({ reason, otherText }) => ({
  schema: REPORT_SCHEMA_URL,
  data: getObjectWithValidKeysOnly({
    comment: otherText,
    reason
  })
})

export default createReportEntity
