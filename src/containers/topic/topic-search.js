import { saveTopicItem, unSaveTopicItem } from './topic.state'
import { useSelector } from 'react-redux'
import { trackItemOpen } from './topic.analytics'
import { trackUnAuthSave } from './topic.analytics'
import { trackItemImpression } from './topic.analytics'
import { trackTopicClick } from './topic.analytics'

import { SearchPageHeader } from 'components/headers/discover-header'
import { CardTopicsNav } from 'connectors/topic-list/topic-list'

import { ItemCard } from 'connectors/item-card/discover/card'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'

export default function TopicSearch({ searchItems, topic, sharedActions }) {
  // Get topicList for sections that require it
  const topics = useSelector((state) => state.topicList?.topicsByName)

  const actions = {
    ...sharedActions,
    saveAction: saveTopicItem,
    unSaveAction: unSaveTopicItem,
    openAction: trackItemOpen,
    impressionAction: trackItemImpression,
    topicClick: trackTopicClick,
    unAuthSaveAction: trackUnAuthSave
  }

  return (
    <>
      <SearchPageHeader title={topic} />
      <Lockup items={searchItems} offset={0} heroPosition="left" ItemCard={ItemCard} />

      <OffsetList items={searchItems} offset={5} cardShape="wide" ItemCard={ItemCard}>
        <CardTopicsNav topics={topics} track={trackTopicClick} rail={true} />
      </OffsetList>

      <OffsetList items={searchItems} offset={10} cardShape="wide" ItemCard={ItemCard} />
      {/* Bottom TopicNav */}
      <CardTopicsNav topics={topics} track={trackTopicClick} />
    </>
  )
}
