import { loadSnowplow } from './load'
import { SNOWPLOW_COLLECTOR } from 'common/constants'
import { SNOWPLOW_HEARTBEAT_DELAY } from 'common/constants'
import { SNOWPLOW_HEARTBEAT_INTERVAL } from 'common/constants'
import { SNOWPLOW_CONFIG } from 'common/constants'
import { INTERNAL_DOMAINS } from 'common/constants'
import { CONTENT_OPEN_DESTINATION_INTERNAL } from './events'
import { CONTENT_OPEN_DESTINATION_EXTERNAL } from './events'
import { createUserEntity, apiUserEntity } from './entities'

export function initializeSnowplow(user_id, sess_guid) {
  // load snowplow scripts
  loadSnowplow('snowplow')

  // configure snowplow
  snowplow('newTracker', 'sp', SNOWPLOW_COLLECTOR, SNOWPLOW_CONFIG)

  // enable activity monitoring (heartbeat)
  snowplow(
    'enableActivityTracking',
    SNOWPLOW_HEARTBEAT_DELAY,
    SNOWPLOW_HEARTBEAT_INTERVAL
  )

  // automatic link tracking
  snowplow('enableLinkClickTracking')

  // automatic form elements tracking
  snowplow('enableFormTracking')

  // add User entity to Snowplow global context
  const userEntity = createUserEntity(user_id, sess_guid)
  const globalContexts = [userEntity, apiUserEntity]
  snowplow('addGlobalContexts', globalContexts)
}

export const getLinkOpenTarget = (link, isSyndicated = false) => {
  const url = new URL(link)
  const isInternal = INTERNAL_DOMAINS.includes(url.hostname)

  if (isSyndicated) return CONTENT_OPEN_DESTINATION_INTERNAL
  if (isInternal) return CONTENT_OPEN_DESTINATION_INTERNAL

  return CONTENT_OPEN_DESTINATION_EXTERNAL
}
