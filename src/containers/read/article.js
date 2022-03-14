import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { nextItemRequest } from './read.state'
import { Content } from 'components/reader/content'
import { Loader, LoaderCentered } from 'components/loader/loader'

export const Article = (itemId) => {
  const dispatch = useDispatch()
  const item = useSelector((state) => state.reader.item)
  const savedData = useSelector((state) => state.reader.savedData)
  const articleContent = item?.article
  const images = item?.images
  const annotations = savedData?.annotations.highlights

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
      <>
        <div>HELLO WORLD</div>
        <Content content={articleContent} images={images} annotations={annotations} />
      </>
    )
  }
}
