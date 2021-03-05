import { trackContentImpression } from 'connectors/snowplow/snowplow.state'
import { trackContentEngagement } from 'connectors/snowplow/snowplow.state'
import { trackContentOpen } from 'connectors/snowplow/snowplow.state'
import { trackEngagement } from 'connectors/snowplow/snowplow.state'
import { ENGAGEMENT_TYPE_GENERAL } from 'connectors/snowplow/events'
import { ENGAGEMENT_TYPE_SAVE } from 'connectors/snowplow/events'
import { IMPRESSION_COMPONENT_UI } from 'connectors/snowplow/events'
import { IMPRESSION_COMPONENT_CARD } from 'connectors/snowplow/events'
import { IMPRESSION_REQUIREMENT_VIEWABLE } from 'connectors/snowplow/events'
import { CONTENT_OPEN_TRIGGER_CLICK } from 'connectors/snowplow/events'
import { UI_COMPONENT_BUTTON } from 'connectors/snowplow/entities'
import { getLinkOpenTarget } from 'connectors/snowplow/events'

export const topicToggleEvent = (topic) => (trackEngagement(
  ENGAGEMENT_TYPE_GENERAL,
  UI_COMPONENT_BUTTON,
  0, // zero since it's not a list item
  'home.topic.toggle',
  topic
))

export const topicImpressionEvent = (item, position) => (trackContentImpression(
  IMPRESSION_COMPONENT_CARD,
  IMPRESSION_REQUIREMENT_VIEWABLE,
  position,
  item,
  'home.topic.impression'
))

export const topicSaveEvent = (item, position) => (trackContentEngagement(
  ENGAGEMENT_TYPE_SAVE,
  UI_COMPONENT_BUTTON,
  position,
  item,
  'home.topic.save'
))

export const topicEngagementEvent = (item, position) => (trackContentEngagement(
  ENGAGEMENT_TYPE_GENERAL,
  UI_COMPONENT_BUTTON,
  position,
  item,
  'home.topic.click'
))

export const topicOpenEvent = (item, position) => {
  const destination = getLinkOpenTarget(item?.save_url, item?.syndicated)

  return trackContentOpen(
    destination,
    CONTENT_OPEN_TRIGGER_CLICK,
    position,
    item,
    'home.topic.open'
  )
}

export const collectionImpressionEvent = (item, position) => (trackContentImpression(
  IMPRESSION_COMPONENT_CARD,
  IMPRESSION_REQUIREMENT_VIEWABLE,
  position,
  { save_url: item?.url },
  'home.collection.impression'
))

export const collectionOpenEvent = (item, position) => {
  const destination = getLinkOpenTarget(item?.url)

  return trackContentOpen(
    destination,
    CONTENT_OPEN_TRIGGER_CLICK,
    position,
    { save_url: item?.url },
    'home.collection.open'
  )
}
