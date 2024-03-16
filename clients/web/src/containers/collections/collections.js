// Libraries
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { css } from '@emotion/css'

// Dependencies
import Layout from 'layouts/main'
import { CallOutBuildHome } from 'components/call-out/call-out-build-home'
import { ItemCard } from 'connectors/items/item-card-transitional'
import { heroGrid, stackedGrid } from 'components/item/items-layout'
import { CallOutCollection } from 'components/call-out/call-out-collections'
import { Pagination } from 'components/pagination/pagination'

// Constants
import { BASE_URL } from 'common/constants'
import { breakpointMediumTablet } from 'common/constants'

export default function Collections({ locale, noIndex, totalResults, perPage, currentPage }) {
  const { t } = useTranslation()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)
  const itemIds = useSelector((state) => state.pageCollectionIds)
  const shouldRender = userStatus !== 'pending'

  const languagePrefix = locale === 'en' ? '' : `/${locale}`
  const canonical = `${BASE_URL}${languagePrefix}/collections`
  const url = canonical
  const title = t('collections:page-title', 'Collections for Your Pocket')
  const metaTitle = noIndex
    ? t('collections:pagination-title', `Collections for Your Pocket — Page {{currentPage}}`, {
        currentPage
      })
    : title
  const description = t('collections:page-description', 'Curated guides to the best of the web')
  const metaData = { description, title: metaTitle, url }

  // We have some alternate markets so we are gonna limit pagination to en only at the moment
  const showPagination = ['en', 'en-US'].includes(locale)

  return (
    <>
      {noIndex ? (
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
      ) : null}

      <Layout
        title={metaTitle}
        metaData={metaData}
        canonical={canonical}
        forceWebView={true}
        className={collectionStyles}>
        {showPagination ? (
          <div className="pagination-container">
            <Pagination
              pagePattern="/collections"
              totalResults={totalResults}
              currentPage={currentPage}
              perPageCount={perPage}
            />
          </div>
        ) : null}

        <header>
          <h1 className="pageTitle" data-testid="page-title">
            {title}
          </h1>
          <h2>
            <div>{description}</div>
          </h2>
        </header>

        <div className={heroGrid}>
          {itemIds.slice(0, 5).map((id, index) => (
            <ItemCard position={index} key={id} id={id} snowplowId="collection" />
          ))}
        </div>

        {!isAuthenticated && shouldRender ? (
          <CallOutBuildHome source="collections" topBorder />
        ) : null}

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

        {showPagination ? (
          <div className="pagination-container">
            <Pagination
              pagePattern="/collections"
              totalResults={totalResults}
              currentPage={currentPage}
              perPageCount={perPage}
            />
          </div>
        ) : null}
      </Layout>
    </>
  )
}

const collectionStyles = css`
  .pagination-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  h1 {
    font-family: 'Graphik Web';
    font-style: normal;
    font-weight: 600;
    font-size: 2.5rem;
    line-height: 1.2;
    letter-spacing: -0.005em;
    margin-bottom: 0.875rem;
  }

  h2 {
    font-family: 'Doyle';
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1.2;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${breakpointMediumTablet} {
      font-weight: 500;
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }
  }
`
