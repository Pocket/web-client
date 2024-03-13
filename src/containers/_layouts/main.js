import PropTypes from 'prop-types'
import { GlobalFooter } from 'components/global-footer/global-footer'
import { PageContainer } from 'components/page-container/page-container'
import GlobalNav from 'connectors/global-nav/global-nav'
import { css, cx } from '@emotion/css'
import { PocketHead } from 'containers/_layouts/_head'

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
  noIndex,
  noNav = false,
  selectedNavLink,
  isFullWidthLayout = false,
  noContainer = false,
  className = '',
  forceWebView = false
}) {
  return (
    <>
      <PocketHead
        title={title}
        noIndex={noIndex}
        canonical={canonical}
        metaData={metaData}
        forceWebView={forceWebView}
      />
      <GlobalNav selectedLink={selectedNavLink} noNav={noNav} />
      <div className={cx(fixedNavContainer, noContainer && noContainerStyle, className)}>
        {isFullWidthLayout ? children : <PageContainer>{children}</PageContainer>}
      </div>
      {noNav ? null : <GlobalFooter />}
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

export default mainLayout
