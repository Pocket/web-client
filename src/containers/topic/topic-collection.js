import { CollectionPageHeader } from 'components/card-layouts/card-page-header'
import { CardList, CardLayout } from 'components/card-layouts/card-layout'
import { useSelector } from 'react-redux'
import { saveTopicItem, unSaveTopicItem } from './topic.state'
import { trackItemOpen, trackTopicClick } from './topic.analytics'
import { trackUnAuthSave } from './topic.analytics'
import { trackItemImpression } from './topic.analytics'
import { CardTopicsNav } from 'components/card-layouts/card-topics-nav'

export default function topicCollection({
  curatedItems,
  topic,
  sharedActions
}) {
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
      <CollectionPageHeader
        title={topic.display_name}
        note={topic.display_note}
      />

      <CardLayout {...actions}>
        {/* Top Lockup (left)*/}
        <CardList type="lockupLeft" count={5} items={curatedItems} />

        {/* Top List */}
        <CardList type="list" count={5} items={curatedItems}>
          {/* Top TopicNav (in rail / inline list) */}
          <CardTopicsNav topics={topics} track={trackTopicClick} rail={true} />
        </CardList>

        {/* Bottom List */}
        <CardList type="list" items={curatedItems} classNames={['no-border']} />

        {/* Bottom TopicNav */}
        <CardTopicsNav topics={topics} track={trackTopicClick} />
      </CardLayout>
    </>
  )
}
