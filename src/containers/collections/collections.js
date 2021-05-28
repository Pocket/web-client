import Layout from 'layouts/main'

import { useSelector } from 'react-redux'

import { CardPageHeader } from 'components/headers/discover-header'
import { ItemCard } from 'connectors/item-card/collection/story-card'
import { Lockup } from 'components/items-layout/list-lockup'

import { useTranslation } from 'next-i18next'

export default function Collections() {
  const { t } = useTranslation()

  const items = useSelector((state) => state.collectionItemsById)
  const itemIds = Object.keys(items)

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

      {/* Top Lockup (center)*/}
      <Lockup items={itemIds} offset={0} heroPosition="center" ItemCard={ItemCard} />
    </Layout>
  )
}
