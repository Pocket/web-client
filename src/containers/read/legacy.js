import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { itemDataRequest } from './read.state'
import { Content } from 'components/reader/content'

export const LegacyArticle = ({
  itemId,
  onMouseUp,
  onHighlightHover,
  annotationsBuilt,
  externalLinkClick
}) => {
  const dispatch = useDispatch()
  const articleData = useSelector((state) => state.myListItemsById[itemId])
  const articleContent = useSelector((state) => state.reader.articleContent)
  const annotations = useSelector((state) => state.reader.annotations)

  const { videos, images } = articleData

  useEffect(() => {
    dispatch(itemDataRequest(itemId))
  }, [dispatch, itemId])

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
