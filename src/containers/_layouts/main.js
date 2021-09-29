import PropTypes from 'prop-types'
import Head from 'next/head'
import { GlobalFooter } from 'components/global-footer/global-footer'
import { PageContainer } from '@pocket/web-ui'
import GlobalNav from 'connectors/global-nav/global-nav'
import { css, cx } from 'linaria'
import { SocialMetaData } from 'components/social-meta-data/social-meta-data'

const fixedNavContainer = css`
  padding-top: 65px;
`
const noContainerStyle = css`
  padding-bottom: 65px;
`

function mainLayout({
  metaData,
  children,
  title = 'Pocket',
  canonical,
  selectedNavLink,
  isFullWidthLayout,
  noContainer = false,
  className = ''
}) {
  const renderSocialMeta = metaData?.description && metaData?.title

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        {canonical ? <link rel="canonical" href={canonical} /> : null}
        {!!renderSocialMeta ? <SocialMetaData {...metaData} /> : null}
      </Head>

      <GlobalNav selectedLink={selectedNavLink} />

      <div className={cx(fixedNavContainer, noContainer && noContainerStyle, className)}>
        {isFullWidthLayout ? children : <PageContainer>{children}</PageContainer>}
      </div>

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
