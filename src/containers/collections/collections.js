import Layout from 'layouts/main'
import { BASE_URL } from 'common/constants'
import { useTranslation } from 'next-i18next'

import { useSelector } from 'react-redux'

import { CallOutBuildHome } from 'components/call-out/call-out-build-home'
import { CardPageHeader } from 'components/headers/discover-header'
import { ItemCard } from 'connectors/items/item-card-transitional'
import { heroGrid, stackedGrid } from 'components/item/items-layout'
import { CallOutCollection } from 'components/call-out/call-out-collections'

export default function Collections({ locale }) {
  const { t } = useTranslation()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)
  const itemIds = useSelector((state) => state.pageCollectionIds)
  const shouldRender = userStatus !== 'pending'

  const languagePrefix = locale === 'en' ? '' : `/${locale}`
  const canonical = `${BASE_URL}${languagePrefix}/collections`
  const url = canonical

  const metaData = {
    description: t('collections:page-description', 'Curated guides to the best of the web'),
    title: t('collections:page-title', 'Collections for Your Pocket'),
    url
  }

  return (
    <Layout title={metaData.title} metaData={metaData} canonical={canonical} forceWebView={true}>
      {!isAuthenticated && shouldRender ? <CallOutBuildHome source="collections" /> : null}

      <CardPageHeader title={metaData.title} subHeading={metaData.description} />

      <div className={heroGrid}>
        {itemIds.slice(0, 5).map((id, index) => (
          <ItemCard position={index} key={id} id={id} snowplowId="collection" />
        ))}
      </div>

      <div className={stackedGrid}>
        {itemIds.slice(5, 10).map((id, index) => (
          <ItemCard position={4 + index} key={id} id={id} snowplowId="collection" />
        ))}
        <CallOutCollection />
      </div>

      <div className={heroGrid}>
        {itemIds.slice(10, 15).map((id, index) => (
          <ItemCard position={9 + index} key={id} id={id} snowplowId="collection" />
        ))}
      </div>

      <div className={stackedGrid}>
        {itemIds.slice(15, 20).map((id, index) => (
          <ItemCard position={14 + index} key={id} id={id} snowplowId="collection" />
        ))}
      </div>
    </Layout>
  )
}
