import PropTypes from 'prop-types'
import { css, cx } from '@emotion/css'
import { GlobalFooter } from 'components/global-footer/global-footer'
import { PageContainer } from 'components/page-container/page-container'
import { breakpointLargeTablet } from 'common/constants'
import GlobalNav from 'connectors/global-nav/global-nav'
import { PocketHead } from 'containers/_layouts/_head'

const savesContainer = css`
  display: grid;
  align-items: start;
  justify-content: space-between;
  grid-column-gap: var(--spacing150);
  grid-row-gap: var(--spacing150);
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: dense;

  .main {
    grid-column: span 10;
  }
  .side-nav {
    grid-column: span 2;
  }

  ${breakpointLargeTablet} {
    grid-column-gap: var(--spacing150);
    grid-row-gap: var(--spacing150);

    .main {
      grid-column: span 12;
    }
    .side-nav {
      display: none;
      grid-column: span 0;
    }
  }
`

const fixedNavContainer = css`
  padding-top: 65px;
  &.withBanner {
    padding-top: 172px;
  }
`

function mainLayout({
  metaData,
  children,
  title = 'Pocket',
  canonical,
  subset,
  tag,
  selectedNavLink,
  isFullWidthLayout = false,
  bannerCampaign,
  noNav = false
}) {
  return (
    <>
      <PocketHead title={title} canonical={canonical} metaData={metaData} />
      <GlobalNav
        selectedLink={selectedNavLink}
        subset={subset}
        tag={tag}
        bannerCampaign={bannerCampaign}
        noNav={noNav}
      />
      <div className={cx(fixedNavContainer, bannerCampaign && 'withBanner')}>
        {isFullWidthLayout ? (
          children
        ) : (
          <PageContainer>
            <div className={savesContainer}>{children}</div>
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

export default mainLayout
