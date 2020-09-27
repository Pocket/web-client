import { sendCustomSnowplowEvent } from 'common/api/snowplow-analytics'
import { createReportEntity } from 'connectors/snowplow/entities'
import { createContentEntity } from 'connectors/snowplow/entities'
import { createEngagementEvent } from 'connectors/snowplow/events'
import { ENGAGEMENT_TYPE_REPORT } from 'connectors/snowplow/events'

export const sendReportToSnowplow = (reportData, user, reportedItem) => {
  const snowplowEvent = createEngagementEvent(ENGAGEMENT_TYPE_REPORT)

  const reportEntity = createReportEntity(
    reportData.reason,
    reportData.otherText
  )

  const contentEntity = createContentEntity(
    reportedItem?.save_url,
    reportedItem?.resolved_id
  )

  const snowplowEntities = [reportEntity, contentEntity]

  sendCustomSnowplowEvent(snowplowEvent, snowplowEntities)
}
