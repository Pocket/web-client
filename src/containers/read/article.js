import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getReadItem } from './read.state'
import { Content } from 'components/reader/content'
import { Loader, LoaderCentered } from 'components/loader/loader'

export const Article = ({
  itemId,
  onMouseUp,
  onHighlightHover,
  annotationsBuilt,
  externalLinkClick
}) => {
  const dispatch = useDispatch()
  const articleItem = useSelector((state) => state.reader.articleItem)
  const savedData = useSelector((state) => state.reader.savedData)
  const articleContent = articleItem?.article
  const annotations = savedData?.annotations.highlights
  const images = articleItem?.images
  const videos = articleItem?.videos

  useEffect(() => {
    dispatch(getReadItem(itemId))
  }, [dispatch, itemId])

  if (!articleItem) {
    return (
      <LoaderCentered>
        <Loader isVisible />
      </LoaderCentered>
    )
  }

  if (articleItem) {
    console.log('Client API')
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
}
