import { sendCustomSnowplowEvent } from 'common/api/snowplow-analytics'
import { createReportEntity } from 'common/setup/snowplow/entities'
import { createContentEntity } from 'common/setup/snowplow/entities'
import { createEngagementEvent } from 'common/setup/snowplow/events'
import { ENGAGEMENT_TYPE_REPORT } from 'common/setup/snowplow/events'

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
