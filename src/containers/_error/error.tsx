// Types
import { FC } from 'react'

// Dependencies
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import Head from 'next/head'
import { css } from 'linaria'

// Components
import { GlobalFooter } from 'components/global-footer/global-footer'
import { PageContainer } from 'components/page-container/page-container'
import GlobalNav from 'connectors/global-nav/global-nav'

// Constants
import { breakpointLargeHandset } from 'common/constants'

// Type declarations
type ErrorPagePropType = {
  statusCode?: number | string
}

type MessageForCodeType = {
  title: string,
  message: string,
  detail?: string,
  ActionComponent?: FC
}

/**
 * ErrorPage
 * This is the visual side of the custon error that we pass on to NextJS to
 * provide an error page that is more in line with the design language of
 * Pocket. It can also be used for explicit errors on pages that do not exist
 * on the web-client but are valid on mobile
 */
export default function ErrorPage({ statusCode }: ErrorPagePropType) {
  const { t } = useTranslation()
  const router = useRouter()
  const url = router.asPath

  // This allows us to handle both explict, and basic errors SSR errors
  const getMessageForCode = (): MessageForCodeType => {
    switch (statusCode) {
      case 404: {
        return {
          title: t('error:404-title', 'Oops! Something’s gone awry...'),
          message: t(
            'error:404-message',
            `Looks like the page you are trying to reach has gone missing. Please contact our support team if you feel this is a mistake.`
          ),
          detail: t('error:404-detail', `'${url}' cannot be found.`),
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
            `There’s been a ${statusCode} error. Try refreshing your page and see if that fixes things. If you’re still seeing the issue, please contact our support team.`
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
        <style>{`
          body, html { height: 100%; }
          #__next { display: flex; flex-direction: column; height: 100%; }
        `}</style>
      </Head>

      <GlobalNav />

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

/**
 * SUB-COMPONENTS
 * This just lets us define different CTAs in future
 * -------------------------------------------------------------------------- */
function GetSupport() {
  const { t } = useTranslation()
  return (
    <a className="button primary large" href="https://help.getpocket.com/">
      {t('error:contact', 'Contact Support')}
    </a>
  )
}

/**
 * COMPONENT STYLES
 * -------------------------------------------------------------------------- */
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
