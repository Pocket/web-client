import { PageContainer } from 'components/page-container/page-container'
import { PocketHead } from 'containers/_layouts/_head'

function mobileLayout({ metaData, children, canonical, title = 'Pocket', forceWebView = false }) {
  return (
    <>
      <PocketHead
        title={title}
        canonical={canonical}
        metaData={metaData}
        forceWebView={forceWebView}
      />

      <PageContainer>{children}</PageContainer>
    </>
  )
}

export default mobileLayout
