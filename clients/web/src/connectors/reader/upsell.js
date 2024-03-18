import { useDispatch, useSelector } from 'react-redux'
import { BottomUpsell } from 'components/reader/upsell.bottom'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

import { COLUMN_WIDTH_RANGE } from 'common/constants'

export const Upsell = () => {
  const dispatch = useDispatch()

  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const columnWidth = useSelector((state) => state.readerSettings.columnWidth)

  const handleImpression = (identifier) => {
    dispatch(sendSnowplowEvent(identifier))
  }

  return isPremium ? null : (
    <BottomUpsell maxWidth={`${COLUMN_WIDTH_RANGE[columnWidth]}px`} onVisible={handleImpression} />
  )
}
