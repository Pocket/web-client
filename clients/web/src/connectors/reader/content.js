import { useDispatch, useSelector } from 'react-redux'
import { Content } from 'components/reader/content'
import { Highlights } from './highlights'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const ContentWrapper = ({ id }) => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.itemsDisplay[id])

  const { article, images, videos } = item

  const externalLinkClick = (href) => {
    const data = { id, url: href }
    dispatch(sendSnowplowEvent('reader.external-link', data))
  }

  return (
    <Highlights id={id}>
      <Content
        images={images}
        videos={videos}
        content={article}
        externalLinkClick={externalLinkClick}
        style={{ padding: '40px' }}
      />
    </Highlights>
  )
}
