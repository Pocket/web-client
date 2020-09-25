import Head from 'next/head'
import { PageContainer } from '@pocket/web-ui'

function mobileLayout({ children, title = 'Pocket' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>

      <PageContainer>{children}</PageContainer>
    </>
  )
}

export default mobileLayout
