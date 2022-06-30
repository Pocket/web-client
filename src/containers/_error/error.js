import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import { css } from 'linaria'
import { GlobalFooter } from 'components/global-footer/global-footer'
import { PageContainer } from 'components/page-container/page-container'
import { breakpointLargeHandset } from 'common/constants' // 599
import GlobalNav from 'connectors/global-nav/global-nav'
import { Button } from 'components/buttons/button'

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

const containerStyle = css`
  display: flex;
  /* set flex grow to 1 so that if a parent page layout wants to vertically center
  this and fill page space with header/footer, it will do that */
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  height: 100%;

  .errorHeading {
    font-family: var(--fontSansSerif);
    font-size: 2.5rem;
    line-height: 120%;
    margin: 0 0 1.5rem 0;
  }

  p {
    margin-bottom: 0.5rem;
  }

  ${breakpointLargeHandset} {
    min-height: 350px;

    .errorHeading {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`
const contentStyle = css`
  max-width: 744px;
`
const messageStyle = css`
  font-family: var(--fontSansSerif);
  color: var(--color-textSecondary);
`

function getMessageForCode(statusCode) {
  if (statusCode === 404) {
    const url = global.location ? `${global.location.pathname}${global.location.search}` : null
    return `There’s been a 404 error. We couldn’t find a matching page${
      url ? ` for "${url}"` : ''
    }. Please contact our support team if you feel this is a mistake.`
  }

  return `There’s been a${
    statusCode ? ` ${statusCode}` : 'n'
  } error. Try refreshing your page and see if that fixes things. If you’re still seeing the issue, please contact our support team.`
}

export default function ErrorPage({ statusCode }) {
  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const [errorMessage, setErrorMessage] = useState(getMessageForCode())

  useEffect(() => {
    setErrorMessage(getMessageForCode(statusCode))
  }, [statusCode])

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
        <div className={containerStyle}>
          <div className={contentStyle}>
            <h1 className="errorHeading">Oops! Something’s gone awry...</h1>
            <p className={messageStyle} data-cy="error-message">
              {errorMessage || getMessageForCode(statusCode)}
            </p>
            <Button size="large" href="https://help.getpocket.com/">
              Contact Support
            </Button>
          </div>
        </div>
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
