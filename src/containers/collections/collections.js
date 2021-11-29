import Layout from 'layouts/main'
import { BASE_URL } from 'common/constants'

import { useSelector } from 'react-redux'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

import { CallOutBuildHome } from 'components/call-out/call-out-build-home'
import { CardPageHeader } from 'components/headers/discover-header'
import { ItemCard } from 'connectors/item-card/collection/collection-card'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'

import { Toasts } from 'connectors/toasts/toast-list'

import { useTranslation } from 'next-i18next'

export default function Collections({ locale }) {
  const { t } = useTranslation()

  const featureState = useSelector((state) => state.features)
  const eoyCollections = featureFlagActive({ flag: 'eoy.2021', featureState })

  const isAuthenticated = useSelector((state) => state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)
  const items = useSelector((state) => state.collectionsBySlug)
  const itemIds = Object.keys(items)
  const shouldRender = userStatus !== 'pending'

  const languagePrefix = locale === 'en' ? '' : `/${locale}`
  const canonical = `${BASE_URL}${languagePrefix}/collections`
  const url = canonical

  const metaData = {
    description: t('collections:page-description', 'Curated guides to the best of the web'),
    title: t('collections:page-title', 'Collections for Your Pocket'),
    url
  }

  const startingOffset = eoyCollections ? 0 : 5
  const useHero = eoyCollections

  return (
    <Layout title={metaData.title} metaData={metaData} canonical={canonical}>
      {!isAuthenticated && shouldRender ? <CallOutBuildHome source="collections" /> : null}

      <CardPageHeader title={metaData.title} subHeading={metaData.description} />

      <Lockup
        items={itemIds}
        offset={startingOffset}
        heroPosition="center"
        ItemCard={ItemCard}
        useHero={useHero}
      />

      <OffsetList items={itemIds} offset={5} cardShape="wide" ItemCard={ItemCard} />

      <Lockup items={itemIds} offset={10} heroPosition="left" ItemCard={ItemCard} />

      <OffsetList items={itemIds} offset={15} cardShape="wide" ItemCard={ItemCard} />

      <Toasts />
    </Layout>
  )
}
