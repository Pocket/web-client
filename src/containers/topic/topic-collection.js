import { CollectionPageHeader } from 'components/headers/discover-header'
import { ItemCard } from 'connectors/item-card/discover/card'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'
import { CardTopicsNav } from 'connectors/topic-list/topic-list'

import { useSelector } from 'react-redux'
import { saveTopicItem, unSaveTopicItem } from './topic.state'
import { trackItemOpen, trackTopicClick } from './topic.analytics'
import { trackUnAuthSave } from './topic.analytics'
import { trackItemImpression } from './topic.analytics'

export default function TopicCollection({ curatedItems, topic, sharedActions }) {
  // Get topicList for sections that require it
  const topics = useSelector((state) => state.topicList?.topicsByName)

  // Actions specific to this page (required by coupled analytics)
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
      <CollectionPageHeader title={topic.display_name} note={topic.display_note} />

      <Lockup items={curatedItems} offset={0} heroPosition="left" ItemCard={ItemCard} />
      <OffsetList items={curatedItems} offset={5} cardShape="wide" ItemCard={ItemCard}>
        <CardTopicsNav topics={topics} track={trackTopicClick} rail={true} />
      </OffsetList>

      <OffsetList items={curatedItems} offset={10} cardShape="wide" ItemCard={ItemCard} />
      <CardTopicsNav topics={topics} track={trackTopicClick} />
    </>
  )
}
