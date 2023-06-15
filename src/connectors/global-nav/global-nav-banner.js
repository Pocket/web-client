import { BannerNewsroom } from 'components/banner/newsroom'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { useDispatch } from 'react-redux'

export const Banner = ({ showBanner: campaign }) => {
  const dispatch = useDispatch()

  const sendImpression = () => {
    dispatch(sendSnowplowEvent(`banner.${campaign}.impression`))
  }

  const handleClick = () => {
    dispatch(sendSnowplowEvent(`banner.${campaign}.click`))
  }

  if (campaign === 'newsroom') {
    return <BannerNewsroom sendImpression={sendImpression} handleClick={handleClick} />
  }

  return null
}
