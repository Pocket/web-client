import { useSelector, useDispatch } from 'react-redux'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { CardPageHeader } from 'components/headers/discover-header'
import { SectionHeader } from 'components/headers/section-header'
import { ItemCard } from 'connectors/item-card/discover/card'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'
import { CardTopicsNav } from 'connectors/topic-list/topic-list'
import { useTranslation } from 'next-i18next'

export default function TopicPage({ curatedItems, algorithmicItems, topic }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  // Get topicList for sections that require it
  const topics = useSelector((state) => state.topicList?.topicsByName)

  const topicClickRail = (topic, index, id) => {
    dispatch(sendSnowplowEvent('topic-page.rail.topic.click', { label: topic }))
  }

  const topicClickBottom = (topic, index, id) => {
    dispatch(sendSnowplowEvent('topic-page.bottom.topic.click', { label: topic }))
  }

  return (
    <>
      <CardPageHeader title={topic.display_name} />

      <SectionHeader
        sectionTitle={t('discover:curated-by-our-editors', 'Curated by our editors')}
        sectionDescription={t('discover:stories-to-fuel-your-mind', 'Stories to fuel your mind')}
      />

      {/* Curated */}
      <Lockup items={curatedItems} offset={0} heroPosition="left" ItemCard={ItemCard} />

      <SectionHeader
        sectionTitle={t('discover:popular-with-readers', 'Popular with Pocket readers')}
        sectionDescription={t('discover:stories-from-the-web', 'Stories from across the web')}
        addPadding={true}
      />

      {/* Algorithmic */}
      <OffsetList items={algorithmicItems} offset={0} cardShape="wide" ItemCard={ItemCard}>
        <CardTopicsNav topics={topics} rail={true} track={topicClickRail} />
      </OffsetList>

      <OffsetList
        items={algorithmicItems}
        offset={5}
        count={15}
        cardShape="wide"
        ItemCard={ItemCard}
      />

      {/* Bottom TopicNav */}
      <CardTopicsNav topics={topics} className="no-border" track={topicClickBottom} />
    </>
  )
}
