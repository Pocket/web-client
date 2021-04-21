import { useSelector } from 'react-redux'
import { trackTopicClick } from './topic.analytics'
import { CardPageHeader } from 'components/headers/discover-header'
import { SectionHeader } from 'components/headers/section-header'
import { ItemCard } from 'connectors/item-card/discover/card'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'
import { CardTopicsNav } from 'connectors/topic-list/topic-list'

export default function TopicPage({ curatedItems, algorithmicItems, topic }) {
  // Get topicList for sections that require it
  const topics = useSelector((state) => state.topicList?.topicsByName)

  return (
    <>
      <CardPageHeader title={topic.display_name} />

      <SectionHeader
        sectionTitle="Curated by our editors"
        sectionDescription="Stories to fuel your mind"
      />

      {/* Curated */}
      <Lockup items={curatedItems} offset={0} heroPosition="left" ItemCard={ItemCard} />

      <SectionHeader
        sectionTitle="Popular with Pocket readers"
        sectionDescription="Stories from across the web"
        addPadding={true}
      />

      {/* Algorithmic */}
      <OffsetList items={algorithmicItems} offset={0} cardShape="wide" ItemCard={ItemCard}>
        <CardTopicsNav topics={topics} track={trackTopicClick} rail={true} />
      </OffsetList>

      <OffsetList items={algorithmicItems} offset={5} cardShape="wide" ItemCard={ItemCard} />

      {/* Bottom TopicNav */}
      <CardTopicsNav topics={topics} track={trackTopicClick} />
    </>
  )
}
