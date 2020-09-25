import { useSelector } from 'react-redux'
import { CardPageHeader } from 'components/card-layouts/card-page-header'
import { CardSectionHeader } from 'components/card-layouts/card-section-header'
import { CardList, CardLayout } from 'components/card-layouts/card-layout'
import { saveTopicItem, unSaveTopicItem } from './topic.state'
import { trackItemOpen, trackItemImpression } from './topic.analytics'
import { trackTopicClick } from './topic.analytics'
import { trackUnAuthSave } from './topic.analytics'
import { CardTopicsNav } from 'components/card-layouts/card-topics-nav'

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

      <CardSectionHeader
        sectionTitle="Curated by our editors"
        sectionDescription="Stories to fuel your mind"
      />

      {/* Curated */}
      <CardLayout {...actions}>
        {/* Top Lockup (left)*/}
        <CardList type="lockupLeft" count={5} items={curatedItems} />
      </CardLayout>

      <CardSectionHeader
        sectionTitle="Popular with Pocket readers"
        sectionDescription="Stories from across the web"
        addPadding={true}
      />

      {/* Algorithmic */}
      <CardLayout {...actions} initialOffset={5}>
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
      </CardLayout>
    </>
  )
}
