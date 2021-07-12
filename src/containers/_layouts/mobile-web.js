import Head from 'next/head'
import { PageContainer } from '@pocket/web-ui'
import { SocialMetaData } from 'components/social-meta-data/social-meta-data'

function mobileLayout({ metaData, children, title = 'Pocket' }) {
  const renderSocialMeta = metaData?.description && metaData?.title
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        {!!renderSocialMeta ? <SocialMetaData {...metaData} /> : null}
      </Head>

      <PageContainer>{children}</PageContainer>
    </>
  )
}

export default mobileLayout
