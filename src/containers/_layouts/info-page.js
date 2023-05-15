import { useSelector } from 'react-redux'
import { css } from '@emotion/css'
import { breakpointMediumTablet, breakpointTinyTablet } from 'common/constants'
import { GlobalFooter } from 'components/global-footer/global-footer'
import { PageContainer } from 'components/page-container/page-container'
import GlobalNav from 'connectors/global-nav/global-nav'
import { PocketHead } from 'containers/_layouts/_head'

export const InfoPageStyles = css`
  .page-container {
    margin-top: var(--spacing150);
    margin-bottom: var(--spacing400);
    font-family: var(--fontSansSerif);
    color: var(--color-textPrimary);
  }
  main {
    max-width: 745px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
  }
  h5 {
    margin: var(--spacing250) 0 var(--spacing075);
  }
  h6 {
    margin-bottom: var(--spacing025);
  }
  p {
    margin-bottom: var(--spacing075);
    font-size: var(--fontSize100);
    color: var(--color-textSecondary);
  }
  ul {
    font-size: var(--fontSize100);
    color: var(--color-textSecondary);
  }

  ${breakpointMediumTablet} {
    h1 {
      font-size: var(--fontSize250);
    }
  }

  ${breakpointTinyTablet} {
    h1 {
      font-size: var(--fontSize200);
    }
  }
`

const InfoPageLayout = ({ metaData, children, canonical, title = 'Pocket' }) => {
  const isLoggedIn = useSelector((state) => !!state.user.auth)

  return (
    <main className={InfoPageStyles}>
      <PocketHead title={title} canonical={canonical} metaData={metaData} />

      <GlobalNav isLoggedIn={isLoggedIn} />

      <PageContainer className="page-container">
        <main>{children}</main>
      </PageContainer>

      <GlobalFooter hasColorBorder={true} />
    </main>
  )
}

export default InfoPageLayout
