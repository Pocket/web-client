import PropTypes from 'prop-types'
import { GlobalFooter } from 'components/global-footer/global-footer'
import { PageContainer } from 'components/page-container/page-container'
import GlobalNav from 'connectors/global-nav/global-nav'
import { css, cx } from '@emotion/css'
import { PocketHead } from 'containers/_layouts/_head'

const fixedNavContainer = css`
  padding-top: 65px;
`

function GetStartedLayout({
  metaData,
  children,
  title = 'Pocket',
  canonical,
  className = '',
  forceWebView = false,
  selectedNavLink = undefined
}) {
  return (
    <>
      <PocketHead
        title={title}
        canonical={canonical}
        metaData={metaData}
        forceWebView={forceWebView}
      />
      <GlobalNav selectedLink={selectedNavLink} noNav={true} />
      <div className={cx(fixedNavContainer, className)}>
        <PageContainer>{children}</PageContainer>
      </div>
      <GlobalFooter minimal={true} />
    </>
  )
}

GetStartedLayout.propTypes = {
  /**
   * Set to true if you need to have full-width or custom width content, in which
   * case you intend to implement your own content container in between the
   * GlobalNav and GlobalFooter, or use <PageContainer> manually within your
   * page content.
   */
  isFullWidthLayout: PropTypes.bool
}

export default GetStartedLayout
