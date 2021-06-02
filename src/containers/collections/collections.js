import Layout from 'layouts/main'

import { useSelector } from 'react-redux'

import { CardPageHeader } from 'components/headers/discover-header'
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
      'Curated guides to the best of the web'
    ),
    title: t('collections:page-title', 'Collections for Your Pocket')
  }

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <CardPageHeader
        title={metaData.title}
        subHeading={metaData.description}
      />

      <Lockup items={itemIds} offset={0} heroPosition="center" ItemCard={ItemCard} />

      {showTopics ? <CardTopicsNav topics={topics} track={trackTopicClick} /> : null}

      <OffsetList items={itemIds} offset={5} cardShape="wide" ItemCard={ItemCard} border={true} />

      <Lockup items={itemIds} offset={10} heroPosition="left" ItemCard={ItemCard} />

      <OffsetList items={itemIds} offset={15} cardShape="wide" ItemCard={ItemCard} border={true} />
    </Layout>
  )
}
