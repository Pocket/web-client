import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { itemDataRequest } from './read.state'

export const Article = ({
  itemId,
  externalLinkClick,
  onMouseUp,
  onHighlightHover,
  annotationsBuilt
}) => {
  const dispatch = useDispatch()
  const articleData = useSelector((state) => state.myListItemsById[itemId])
  const articleContent = useSelector((state) => state.reader.articleContent)

  console.log({ articleData, articleContent })

  useEffect(() => {
    dispatch(itemDataRequest(itemId))
  }, [dispatch, itemId])

  return <div>I am an article!</div>
}
