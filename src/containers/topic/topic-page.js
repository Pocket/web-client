import { useSelector } from 'react-redux'
import { saveTopicItem, unSaveTopicItem } from './topic.state'
import { trackItemOpen, trackItemImpression } from './topic.analytics'
import { trackTopicClick } from './topic.analytics'
import { trackUnAuthSave } from './topic.analytics'

import { CardPageHeader } from 'components/headers/discover-header'
import { SectionHeader } from 'components/headers/section-header'
import { CardList } from 'components/items-layout/dynamic-blocks'
import { DynamicCardLayout } from 'components/items-layout/dynamic-blocks'
import { CardTopicsNav } from 'components/items-layout/topic-list'

export default function topicPage({
  curatedItems,
  algorithmicItems,
  topic,
  sharedActions
}) {
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
      <CardPageHeader title={topic.display_name} />

      <SectionHeader
        sectionTitle="Curated by our editors"
        sectionDescription="Stories to fuel your mind"
      />

      {/* Curated */}
      <DynamicCardLayout {...actions}>
        {/* Top Lockup (left)*/}
        <CardList type="lockupLeft" count={5} items={curatedItems} />
      </DynamicCardLayout>

      <SectionHeader
        sectionTitle="Popular with Pocket readers"
        sectionDescription="Stories from across the web"
        addPadding={true}
      />

      {/* Algorithmic */}
      <DynamicCardLayout {...actions} initialOffset={5}>
        {/* Top List */}
        <CardList type="list" count={5} items={algorithmicItems}>
          {/* Top TopicNav (in rail / inline list) */}
          <CardTopicsNav topics={topics} track={trackTopicClick} rail={true} />
        </CardList>

        {/* Bottom List */}
        <CardList
          type="list"
          items={algorithmicItems}
          classNames={['no-border']}
        />

        {/* Bottom TopicNav */}
        <CardTopicsNav topics={topics} track={trackTopicClick} />
      </DynamicCardLayout>
    </>
  )
}
