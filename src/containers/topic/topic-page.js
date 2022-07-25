import { useSelector } from 'react-redux'
import { CardPageHeader } from 'components/headers/discover-header'
import { SectionHeader } from 'components/headers/section-header'
import { ItemCard } from 'connectors/item-card/discover/card'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'
import { CardTopicsNav } from 'connectors/topic-list/topic-list'
import { useTranslation } from 'next-i18next'

export default function TopicPage({ curatedItems, algorithmicItems, topic }) {
  const { t } = useTranslation()

  // Get topicList for sections that require it
  const topics = useSelector((state) => state.topicList?.topicsByName)

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
        <CardTopicsNav topics={topics} rail={true} surface="topic-page.rail" />
      </OffsetList>

      <OffsetList
        items={algorithmicItems}
        offset={5}
        count={15}
        cardShape="wide"
        ItemCard={ItemCard}
      />

      {/* Bottom TopicNav */}
      <CardTopicsNav topics={topics} className="no-border" surface="topic-page.bottom" />
    </>
  )
}
