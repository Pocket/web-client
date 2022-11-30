import Layout from 'layouts/main'
import { BASE_URL } from 'common/constants'

import { useSelector } from 'react-redux'

import { CallOutBuildHome } from 'components/call-out/call-out-build-home'
import { CardPageHeader } from 'components/headers/discover-header'
import { ItemCard } from 'connectors/item-card/collection/collection-card'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'

import { Toasts } from 'connectors/toasts/toast-list'

import { useTranslation } from 'next-i18next'

export default function Collections({ locale }) {
  const { t } = useTranslation()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)
  const items = useSelector((state) => state.collectionsBySlug)
  const itemIds = Object.keys(items)
  const shouldRender = userStatus !== 'pending'

  const languagePrefix = locale === 'en' ? '' : `/${locale}`
  const canonical = `${BASE_URL}${languagePrefix}/collections`
  const url = canonical

  // Remove Best Of specific metadata once the campaign is complete
  const bestOfImage =
    'https://s3.amazonaws.com/pocket-collectionapi-prod-images/20a5c150-c497-400a-a4be-a035225be3e8.jpeg'

  const metaData = {
    // description: t('collections:page-description', 'Curated guides to the best of the web'),
    // title: t('collections:page-title', 'Collections for Your Pocket'),
    description: t('collections:best-of-page-description', 'The year’s top articles'),
    title: t('collections:best-of-page-title', 'Pocket’s Best of 2022'),
    image: bestOfImage,
    url
  }

  const startingOffset = 0
  const useHero = false

  return (
    <Layout title={metaData.title} metaData={metaData} canonical={canonical} forceWebView={true}>
      {!isAuthenticated && shouldRender ? <CallOutBuildHome source="collections" /> : null}

      <CardPageHeader title={metaData.title} subHeading={metaData.description} />

      <Lockup
        items={itemIds}
        offset={startingOffset}
        heroPosition="left"
        ItemCard={ItemCard}
        useHero={useHero}
      />

      <OffsetList
        items={itemIds}
        offset={startingOffset + 5}
        cardShape="wide"
        ItemCard={ItemCard}
      />

      <Lockup
        items={itemIds}
        offset={startingOffset + 10}
        heroPosition="left"
        ItemCard={ItemCard}
      />

      <OffsetList
        items={itemIds}
        offset={startingOffset + 15}
        cardShape="wide"
        ItemCard={ItemCard}
      />

      <Toasts />
    </Layout>
  )
}
