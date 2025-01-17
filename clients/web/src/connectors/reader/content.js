import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Content } from 'components/reader/content'
import { Highlights } from './highlights'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const ContentWrapper = ({ id }) => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.itemsDisplay[id])
  const { article, images, videos } = item

  const savedData = useSelector((state) => state.itemsSaved[id])
  const { highlights = [] } = savedData?.annotations

  const externalLinkClick = (href) => {
    const data = { id, url: href }
    dispatch(sendSnowplowEvent('reader.external-link', data))
  }

  // const [highlight, setHighlight] = useState(null)
  useEffect(() => {
    const toggleHighlight = () => {
      const selection = window.getSelection()
      console.log(selection)
      // if (selection.toString()) return setHighlight(selection)
      // if (highlight) return setHighlight(null)
    }

    document.addEventListener('mouseup', toggleHighlight)
    return () => document.removeEventListener('mouseup', toggleHighlight)
  }, [])

  return (
    <>
      <Highlights id={id} />
      <Content
        annotations={highlights}
        images={images}
        videos={videos}
        content={article}
        externalLinkClick={externalLinkClick}
        style={{ padding: '40px' }}
      />
    </>
  )
}
