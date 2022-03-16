import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { nextItemRequest } from './read.state'
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
  const item = useSelector((state) => state.reader.item)
  const savedData = useSelector((state) => state.reader.savedData)
  const articleContent = item?.article
  const annotations = savedData?.annotations.highlights
  const images = item?.images
  const videos = item?.videos

  useEffect(() => {
    dispatch(nextItemRequest(itemId))
  }, [dispatch, itemId])

  if (!item) {
    return (
      <LoaderCentered>
        <Loader isVisible />
      </LoaderCentered>
    )
  }

  if (item) {
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
