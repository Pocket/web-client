import Layout from 'layouts/main'

import { useSelector } from 'react-redux'

import { CallOutBuildHome } from 'components/call-out/call-out-build-home'
import { CardPageHeader } from 'components/headers/discover-header'
import { ItemCard } from 'connectors/item-card/collection/collection-card'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'

import { Toasts } from 'connectors/toasts/toast-list'

import { useTranslation } from 'next-i18next'

export default function Collections() {
  const { t } = useTranslation()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)
  const items = useSelector((state) => state.collectionsBySlug)
  const itemIds = Object.keys(items)
  const shouldRender = userStatus !== 'pending'

  const metaData = {
    description: t('collections:page-description', 'Curated guides to the best of the web'),
    title: t('collections:page-title', 'Collections for Your Pocket')
  }

  return (
    <Layout title={metaData.title} metaData={metaData}>
      {!isAuthenticated && shouldRender ? <CallOutBuildHome source="collections" /> : null}

      <CardPageHeader title={metaData.title} subHeading={metaData.description} />

      <Lockup items={itemIds} offset={0} heroPosition="center" ItemCard={ItemCard} />

      <OffsetList items={itemIds} offset={5} cardShape="wide" ItemCard={ItemCard} />

      <Lockup items={itemIds} offset={10} heroPosition="left" ItemCard={ItemCard} />

      <OffsetList items={itemIds} offset={15} cardShape="wide" ItemCard={ItemCard} />

      <Toasts />
    </Layout>
  )
}
