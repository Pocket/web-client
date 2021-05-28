import Layout from 'layouts/main'

import { useSelector } from 'react-redux'

import { CardPageHeader } from 'components/headers/discover-header'
import { CardListHeading } from 'components/headers/discover-header'
import { ItemCard } from 'connectors/item-card/collection/story-card'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'
import { CardTopicsNav } from 'connectors/topic-list/topic-list'
import { trackTopicClick } from 'containers/discover/discover.analytics'

import { useTranslation } from 'next-i18next'

export default function Collections({ locale }) {
  const { t } = useTranslation()

  const items = useSelector((state) => state.collectionItemsById)
  const itemIds = Object.keys(items)
  const topics = useSelector((state) => state.topicList?.topicsByName)
  const showTopics = locale === 'en'

  const metaData = {
    description: t(
      'collections:page-description',
      'Pink elephants and lava lamps'
    ),
    title: t('collections:page-title', 'Page title for collections')
  }

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <CardPageHeader
        title={metaData.title}
        subHeading={metaData.description}
      />

      <Lockup items={itemIds} offset={0} heroPosition="center" ItemCard={ItemCard} />

      {showTopics ? <CardTopicsNav topics={topics} track={trackTopicClick} /> : null}

      <CardListHeading>{t('collections:collections-are-cool', 'Collections are cool')}</CardListHeading>

      <OffsetList items={itemIds} offset={5} cardShape="wide" ItemCard={ItemCard} border={true} />

      <Lockup items={itemIds} offset={10} heroPosition="left" ItemCard={ItemCard} />

      <OffsetList items={itemIds} offset={15} cardShape="wide" ItemCard={ItemCard} border={true} />

      <Lockup items={itemIds} offset={20} heroPosition="right" ItemCard={ItemCard} />

      <OffsetList items={itemIds} offset={25} cardShape="wide" ItemCard={ItemCard} border={true} />
    </Layout>
  )
}
