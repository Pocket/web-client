import { CollectionPageHeader } from 'components/headers/discover-header'
import { CardList } from 'components/items-layout/dynamic-blocks'
import { DynamicCardLayout } from 'components/items-layout/dynamic-blocks'
import { CardTopicsNav } from 'components/items-layout/topic-list'

import { useSelector } from 'react-redux'
import { trackTopicClick } from './topic.analytics'
import { ItemCard } from 'connectors/item-card/discover/card'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'

export default function TopicCollection({ curatedItems, topic }) {
  // Get topicList for sections that require it
  const topics = useSelector((state) => state.topicList?.topicsByName)

  return (
    <>
      <CollectionPageHeader title={topic.display_name} note={topic.display_note} />

      <Lockup items={curatedItems} offset={0} heroPosition="left" ItemCard={ItemCard} />

      <OffsetList items={curatedItems} offset={5} cardShape="wide" ItemCard={ItemCard}>
        <CardTopicsNav topics={topics} track={trackTopicClick} rail={true} />
      </OffsetList>

      <OffsetList
        items={curatedItems}
        offset={10}
        count={15}
        cardShape="wide"
        ItemCard={ItemCard}
      />
    </>
  )
}
