import { CollectionPageHeader } from 'components/headers/discover-header'
import { useSelector } from 'react-redux'
import { ItemCard } from 'connectors/item-card/discover/card'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'
import { CardTopicsNav } from 'connectors/topic-list/topic-list'

export default function TopicCollection({ curatedItems, topic }) {
  // Get topicList for sections that require it
  const topics = useSelector((state) => state.topicList?.topicsByName)

  return (
    <>
      <CollectionPageHeader title={topic.display_name} note={topic.display_note} />

      <Lockup items={curatedItems} offset={0} heroPosition="left" ItemCard={ItemCard} />

      <OffsetList items={curatedItems} offset={5} cardShape="wide" ItemCard={ItemCard}>
        <CardTopicsNav topics={topics} rail={true} surface="topic-collection.rail" />
      </OffsetList>

      <OffsetList items={curatedItems} offset={10} cardShape="wide" ItemCard={ItemCard} />
      <CardTopicsNav topics={topics} surface="topic-collection.bottom" />
    </>
  )
}
