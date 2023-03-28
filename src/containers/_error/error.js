import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import { css } from 'linaria'
import { GlobalFooter } from 'components/global-footer/global-footer'
import { PageContainer } from 'components/page-container/page-container'
import { breakpointLargeHandset } from 'common/constants' // 599
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

  .container {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    height: 100%;
    padding-top: 65px;

    .errorHeading {
      font-family: var(--fontSansSerif);
      font-size: 2.5rem;
      line-height: 120%;
      margin: 0 0 1.5rem 0;
    }

    ${breakpointLargeHandset} {
      min-height: 350px;
    }
  }

  .content {
    max-width: 744px;
  }

  h1 {
    font-size: 2.5rem;
    line-height: 120%;
    margin: 0 0 1.5rem;
    ${breakpointLargeHandset} {
      font-size: 2rem;
    }
  }
  cite {
    display: block;
    padding: 1rem;
    background-color: var(--color-navCurrentTab);
    border-radius: var(--borderRadius);
    margin-bottom: 1rem;
  }
  p {
    color: var(--color-textSecondary);
    margin-bottom: 2rem;
    ${breakpointLargeHandset} {
      font-size: 1rem;
    }
  }
`

export default function ErrorPage({ statusCode, explicitError }) {
  const { t } = useTranslation()
  const router = useRouter()
  const url = router.asPath
  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const errorCode = explicitError || statusCode

  const getMessageForCode = () => {
    switch (errorCode) {
      case 404: {
        return {
          title: t('error:404-title', 'Oops! Something’s gone awry...'),
          message: t(
            'error:404-message',
            `Looks like the page you are trying to reach has gone missing. Please contact our support team if you feel this is a mistake.`
          ),
          detail: `'${url}' cannot be found.`,
          ActionComponent: GetSupport
        }
      }

      case 'mobileNotficationSettings': {
        return {
          title: t('error:notification-title', 'Hmm, looks like something went wrong'),
          message: t(
            'error:notification-message',
            'The link you clicked directs you to your phone’s notification settings, which can only be accessed on a mobile device.'
          )
        }
      }

      default: {
        return {
          title: t('error:title', 'Oops! Something’s gone awry...'),
          message: t(
            'error:message',
            `There’s been a ${errorCode} error. Try refreshing your page and see if that fixes things. If you’re still seeing the issue, please contact our support team.`
          ),
          ActionComponent: GetSupport
        }
      }
    }
  }

  const { title, message, detail, ActionComponent } = getMessageForCode()

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
        <div className="container">
          <div className="content">
            <h1>{title}</h1>
            {detail ? <cite>{detail}</cite> : null}
            <p data-cy="error-message">{message}</p>
            {ActionComponent ? <ActionComponent /> : null}
          </div>
        </div>
      </PageContainer>

      <GlobalFooter />
    </>
  )
}

function GetSupport() {
  const { t } = useTranslation()
  return (
    <a className="button primary large" href="https://help.getpocket.com/">
      {t('error:contact', 'Contact Support')}
    </a>
  )
}
