import { PageContainer } from '@pocket/web-ui'
import { PocketHead } from 'containers/_layouts/_head'

function mobileLayout({ metaData, children, canonical, title = 'Pocket' }) {
  return (
    <>
      <PocketHead title={title} canonical={canonical} metaData={metaData} />

      <PageContainer>{children}</PageContainer>
    </>
  )
}

export default mobileLayout
