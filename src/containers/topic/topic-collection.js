import { CollectionPageHeader } from 'components/headers/discover-header'
import { useSelector, useDispatch } from 'react-redux'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { ItemCard } from 'connectors/item-card/discover/card'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'
import { CardTopicsNav } from 'connectors/topic-list/topic-list'

export default function TopicCollection({ curatedItems, topic }) {
  const dispatch = useDispatch()
  // Get topicList for sections that require it
  const topics = useSelector((state) => state.topicList?.topicsByName)

  const topicClickRail = (topic, index, id) => {
    dispatch(sendSnowplowEvent('topic-collection.rail.topic.click', { label: topic }))
  }

  const topicClickBottom = (topic, index, id) => {
    dispatch(sendSnowplowEvent('topic-collection.bottom.topic.click', { label: topic }))
  }

  return (
    <>
      <CollectionPageHeader title={topic.display_name} note={topic.display_note} />

      <Lockup items={curatedItems} offset={0} heroPosition="left" ItemCard={ItemCard} />

      <OffsetList items={curatedItems} offset={5} cardShape="wide" ItemCard={ItemCard}>
        <CardTopicsNav topics={topics} rail={true} track={topicClickRail} />
      </OffsetList>

      <OffsetList items={curatedItems} offset={10} cardShape="wide" ItemCard={ItemCard} />
      <CardTopicsNav topics={topics} track={topicClickBottom} />
    </>
  )
}
