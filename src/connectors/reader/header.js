import { useDispatch, useSelector } from 'react-redux'
import { ItemHeader } from 'components/reader/header'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const Header = ({ id }) => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.itemsDisplay[id])
  const savedData = useSelector((state) => state.itemsSaved[id])

  const { title, authors, externalUrl, publisher, timeToRead, datePublished, analyticsData } = item
  const { tags } = savedData
  const tagList = tags?.map((tag) => tag.name)

  const viewOriginalEvent = () => {
    dispatch(sendSnowplowEvent('reader.view-original', analyticsData))
  }

  return (
    <ItemHeader
      viewOriginalEvent={viewOriginalEvent}
      authors={authors}
      title={title}
      externalUrl={externalUrl}
      publisher={publisher}
      tags={tagList}
      timeToRead={timeToRead}
      datePublished={datePublished}
    />
  )
}
