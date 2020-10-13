import PropTypes from 'prop-types'
import Head from 'next/head'
import { css } from 'linaria'
import { GlobalFooter, PageContainer } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'
import GlobalNav from 'connectors/global-nav/global-nav'

const myListContainer = css`
  display: grid;
  align-items: start;
  justify-content: space-between;
  grid-column-gap: var(--spacing150);
  grid-row-gap: var(--spacing150);
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: dense;

  ${breakpointLargeTablet} {
    grid-column-gap: var(--spacing150);
    grid-row-gap: var(--spacing150);
  }
  .main {
    grid-column: span 10;
  }
  .side-nav {
    grid-column: span 2;
  }
`

const fixedNavContainer = css`
  padding-top: 65px;
`

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

      <div className={fixedNavContainer}>
        {isFullWidthLayout ? (
          children
        ) : (
          <PageContainer>
            <div className={myListContainer}>{children}</div>
          </PageContainer>
        )}
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
