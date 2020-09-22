import PropTypes from 'prop-types'
import Head from 'next/head'
import { GlobalFooter, PageContainer } from '@pocket/web-ui'
import GlobalNav from '../../connectors/global-nav/global-nav'

function mainLayout({
  metaData,
  children,
  title = 'Pocket',
  canonical,
  selectedNavLink,
  isFullWidthLayout
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        {canonical ? <link rel="canonical" href={canonical} /> : null}
      </Head>

      <GlobalNav selectedLink={selectedNavLink} />

      {isFullWidthLayout ? children : <PageContainer>{children}</PageContainer>}

      <GlobalFooter />
    </>
  )
}

mainLayout.propTypes = {
  /**
   * Set to true if you need to have full-width or custom width content, in which
   * case you intend to implement your own content container in between the
   * GlobalNav and GlobalFooter, or use <PageContainer> manually within your
   * page content.
   */
  isFullWidthLayout: PropTypes.bool
}

mainLayout.defaultProps = {
  selectedNavLink: undefined,
  isFullWidthLayout: false
}

export default mainLayout
