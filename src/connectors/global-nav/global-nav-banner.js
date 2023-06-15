import { BannerNewsroom } from 'components/banner/newsroom'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { useDispatch } from 'react-redux'

export const Banner = ({ bannerCampaign }) => {
  const dispatch = useDispatch()

  const sendImpression = () => {
    dispatch(sendSnowplowEvent(`banner.${bannerCampaign}.impression`))
  }

  const handleClick = () => {
    dispatch(sendSnowplowEvent(`banner.${bannerCampaign}.click`))
  }

  if (bannerCampaign === 'newsroom') {
    return <BannerNewsroom sendImpression={sendImpression} handleClick={handleClick} />
  }

  return null
}
