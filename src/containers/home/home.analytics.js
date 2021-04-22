import { trackItemImpression } from 'connectors/snowplow/snowplow.state'
import { trackItemSave } from 'connectors/snowplow/snowplow.state'
import { trackItemAction } from 'connectors/snowplow/snowplow.state'
import { trackItemOpen } from 'connectors/snowplow/snowplow.state'
import { trackEngagement } from 'connectors/snowplow/snowplow.state'
import { ENGAGEMENT_TYPE_GENERAL } from 'connectors/snowplow/events'
import { UI_COMPONENT_BUTTON } from 'connectors/snowplow/entities'
import { getLinkOpenTarget } from 'connectors/snowplow/events'

export const topicToggleEvent = (topic) =>
  trackEngagement(
    ENGAGEMENT_TYPE_GENERAL,
    UI_COMPONENT_BUTTON,
    0, // zero since it's not a list item
    'home.topic.toggle',
    topic
  )

export const topicImpressionEvent = (item, position) => {
  return trackItemImpression(position, item, 'home.topic.impression')
}
export const topicSaveEvent = (item, position) => {
  return trackItemSave(position, item, 'home.topic.save')
}
export const topicEngagementEvent = (item, position) => {
  return trackItemAction(position, item, 'home.topic.click')
}
export const topicOpenEvent = (item, position) => {
  const destination = getLinkOpenTarget(item?.save_url, item?.syndicated)
  return trackItemOpen(position, item, 'home.topic.open')
}

export const collectionImpressionEvent = (item, position) => {
  return trackItemImpression(position, { save_url: item?.url }, 'home.collection.impression')
}
export const collectionOpenEvent = (item, position) => {
  const destination = getLinkOpenTarget(item?.url)
  return trackItemOpen(position, { save_url: item?.url }, 'home.collection.open')
}

export const recImpressionEvent = (item, position) => {
  return trackItemImpression(position, item, 'home.rec.impression')
}
export const recSaveEvent = (item, position) => {
  return trackItemSave(position, item, 'home.rec.save')
}
export const recOpenEvent = (item, position) => {
  const destination = getLinkOpenTarget(item?.save_url, item?.syndicated)
  return trackItemOpen(position, item, 'home.rec.open')
}
