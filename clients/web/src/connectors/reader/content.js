import { useDispatch, useSelector } from 'react-redux'
import { Content } from 'components/reader/content'
import { Highlights } from './highlights'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const ContentWrapper = ({ id, articleRef, annotationsProcessed, annotationsCallback }) => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.itemsDisplay[id])
  const { article, images, videos } = item

  const savedData = useSelector((state) => state.itemsSaved[id])
  const { highlights = [] } = savedData?.annotations

  const externalLinkClick = (href) => {
    const data = { id, url: href }
    dispatch(sendSnowplowEvent('reader.external-link', data))
  }

  return (
    <>
      <Highlights id={id} articleRef={articleRef} annotationsProcessed={annotationsProcessed} />
      <Content
        articleRef={articleRef}
        annotations={highlights}
        images={images}
        videos={videos}
        content={article}
        annotationsCallback={annotationsCallback}
        externalLinkClick={externalLinkClick}
        style={{ padding: '40px' }}
      />
    </>
  )
}
