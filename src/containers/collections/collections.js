import Layout from 'layouts/main'
import { BASE_URL } from 'common/constants'

import { useSelector } from 'react-redux'

import { CallOutBuildHome } from 'components/call-out/call-out-build-home'
import { CardPageHeader } from 'components/headers/discover-header'
import { ItemCard } from 'containers/collections/collection-card'
import { Lockup } from 'components/items-layout/list-lockup'
import { OffsetList } from 'components/items-layout/list-offset'
import { Toasts } from 'connectors/toasts/toast-list'

export default function Collections({ locale }) {

  const isAuthenticated = useSelector((state) => state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)
  const itemIds = useSelector((state) => state.collectionsPage)
  const shouldRender = userStatus !== 'pending'

  const languagePrefix = locale === 'en' ? '' : `/${locale}`
  const canonical = `${BASE_URL}${languagePrefix}/collections`
  const url = canonical

  // Remove Best Of specific metadata once the campaign is complete
  const isGerman = locale === 'de' || locale === 'de-DE'
  const title = isGerman ? 'Best of 2022' : 'Pocket’s Best of 2022'
  const description = isGerman
    ? 'Die besten Artikel des Jahres in Pocket'
    : 'The year’s top articles'
  const bestOfImage = isGerman
    ? 'https://s3.amazonaws.com/pocket-collectionapi-prod-images/2990c169-326f-4839-be58-d0cad7286cfc.png'
    : 'https://s3.amazonaws.com/pocket-collectionapi-prod-images/20a5c150-c497-400a-a4be-a035225be3e8.jpeg'

  const metaData = {
    // description: t('collections:page-description', 'Curated guides to the best of the web'),
    // title: t('collections:page-title', 'Collections for Your Pocket'),
    description: description,
    title: title,
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
