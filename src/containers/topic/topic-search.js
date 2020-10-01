import { SearchPageHeader } from 'components/discover-layouts/card-page-header'
import { CardList, CardLayout } from 'components/discover-layouts/card-layout'
import { saveTopicItem, unSaveTopicItem } from './topic.state'
import { useSelector } from 'react-redux'
import { trackItemOpen } from './topic.analytics'
import { trackUnAuthSave } from './topic.analytics'
import { trackItemImpression } from './topic.analytics'
import { trackTopicClick } from './topic.analytics'
import { CardTopicsNav } from 'components/discover-layouts/card-topics-nav'

export default function topicSearch({ searchItems, topic, sharedActions }) {
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
      <CardLayout {...actions}>
        {/* Top List */}
        <CardList type="lockupLeft" count={5} items={searchItems} />

        {/* Top List */}
        <CardList type="list" count={10} items={searchItems}>
          <CardTopicsNav topics={topics} track={trackTopicClick} rail={true} />
        </CardList>

        {/* Bottom List */}
        <CardList type="list" items={searchItems} />

        {/* Bottom TopicNav */}
        <CardTopicsNav
          topics={topics}
          track={trackTopicClick}
          classNames={['no-border']}
        />
      </CardLayout>
    </>
  )
}
