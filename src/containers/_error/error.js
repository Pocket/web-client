import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import { css } from 'linaria'

import { GlobalFooter } from 'components/global-footer/global-footer'
import { PageContainer } from '@pocket/web-ui'
import { ErrorPage as ErrorPageComponent } from '@pocket/web-ui'

import GlobalNav from 'connectors/global-nav/global-nav'

const pageContainerStyle = css`
  display: flex;
  align-items: stretch;
  flex-grow: 1;
  flex-shrink: 0;

  & > div {
    min-height: auto;
    height: auto;
  }
`

export default function ErrorPage({ statusCode }) {
  const isLoggedIn = useSelector((state) => !!state.user.auth)

  return (
    <>
      <Head>
        <title>Error</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        {/* need to max out body height so that we can make a sticky footer / full
        height layout using flexbox */}
        <style>{`
          body, html { height: 100%; }
          #__next { display: flex; flex-direction: column; height: 100%; }
        `}</style>
      </Head>

      <GlobalNav isLoggedIn={isLoggedIn} />

      <PageContainer className={pageContainerStyle}>
        <ErrorPageComponent statusCode={parseInt(statusCode, 10)} />
      </PageContainer>

      <GlobalFooter />
    </>
  )
}

ErrorPage.propTypes = {
  /**
   * Error status code from a failed request if this page is used to display
   * a page-blocking error caused by that request (e.g., 404 page not found)
   */
  statusCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

ErrorPage.defaultProps = {
  statusCode: null
}
