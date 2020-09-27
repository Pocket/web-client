import { getSchemaUri } from 'common/api/snowplow-analytics'
import { getObjectWithValidKeysOnly } from 'common/utilities'

const REPORT_SCHEMA_URL = getSchemaUri('report')

const createReportEntity = (reason, otherText) => {
  const data = getObjectWithValidKeysOnly({
    comment: otherText,
    reason
  })

  return {
    schema: REPORT_SCHEMA_URL,
    data
  }
}

export default createReportEntity
