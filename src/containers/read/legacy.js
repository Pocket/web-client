import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { itemDataRequest } from './read.state'
import { Content } from 'components/reader/content'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const LegacyArticle = ({ itemId, onMouseUp, onHighlightHover, annotationsBuilt }) => {
  const dispatch = useDispatch()
  const articleData = useSelector((state) => state.myListItemsById[itemId])
  const articleContent = useSelector((state) => state.reader.articleContent)
  const annotations = useSelector((state) => state.reader.annotations)

  const { videos, images } = articleData

  useEffect(() => {
    dispatch(itemDataRequest(itemId))
  }, [dispatch, itemId])

  const externalLinkClick = (href) => {
    const data = { id: itemId, url: href }
    dispatch(sendSnowplowEvent('reader.external-link', data))
  }

  return (
    <Content
      images={images}
      videos={videos}
      content={articleContent}
      annotations={annotations}
      externalLinkClick={externalLinkClick}
      onMouseUp={onMouseUp}
      onHighlightHover={onHighlightHover}
      annotationsBuilt={annotationsBuilt}
    />
  )
}
