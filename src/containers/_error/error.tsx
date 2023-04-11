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

/**
 * This is the visual side of the custon error that we pass on to NextJS to
 * provide an error page that is more in line with the design language of
 * Pocket. It can also be used for explicit errors on pages that do not exist
 * on the web-client but are valid on mobile
 */
export default function ErrorPage({ statusCode }: { statusCode?: number | string }) {
  const specificCodes = {
    404: NotFoundError,
    moderatedList: ModeratedListError,
    mobileNotification: MobileNotification,
    userNotification: UserNotification,
    impossible: ImpossibleError
  }

  const ErrorComponent = specificCodes[statusCode] ? specificCodes[statusCode] : GeneralError

  return (
    <>
      {/* prettier-ignore */}
      <Head>
        <title>Error</title>

        {/* Body specific styles — Needed to keep footer in the correct place */}
        <style>{`
          body, html { height: 100%; }
          #__next { display: flex; flex-direction: column; height: 100%; }
        `}</style>

        {/* Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/i/apple-touch-icon/Pocket_AppIcon_@57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/i/apple-touch-icon/Pocket_AppIcon_@72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/i/apple-touch-icon/Pocket_AppIcon_@114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/i/apple-touch-icon/Pocket_AppIcon_@144.png" />
      </Head>

      <GlobalNav />

      <PageContainer className={pageContainerStyle}>
        <div className="container">
          <ErrorComponent statusCode={statusCode} />
        </div>
      </PageContainer>

      <GlobalFooter />
    </>
  )
}

/**
 * Used for 404 Errors
 * -------------------------------------------------------------------------- */
function NotFoundError() {
  const { t } = useTranslation()
  const router = useRouter()
  const url = router.asPath

  return (
    <div className="content">
      <h1>{t('error:404-title', 'Oops! Something’s gone awry...')}</h1>
      <cite>{t('error:404-detail', `'${url}' cannot be found.`)}</cite>
      <p data-cy="error-message">
        {t(
          'error:404-message',
          `Looks like the page you are trying to reach has gone missing. Please contact our support team if you feel this is a mistake.`
        )}
      </p>

      <a className="button primary large" href="https://help.getpocket.com/">
        {t('error:contact', 'Contact Support')}
      </a>
    </div>
  )
}

/**
 * Used for lists that have been taken down due to moderation
 * -------------------------------------------------------------------------- */
function ModeratedListError() {
  const { t } = useTranslation()
  return (
    <div className="content">
      <h1>{t('error:title', 'Oops! Something’s gone awry...')}</h1>
      <p data-cy="error-message">
        {t(
          'error:moderated-list-message',
          `This List is not available because it may have violated Pocket’s Shared Content Policies.`
        )}
      </p>
    </div>
  )
}

/**
 * Used for mobile notifications messaging
 * -------------------------------------------------------------------------- */
function MobileNotification() {
  const { t } = useTranslation()
  return (
    <div className="content">
      <h1>{t('error:notification-title', 'Hmm, looks like something went wrong')}</h1>
      <p data-cy="error-message">
        {t(
          'error:notification-message',
          'The link you clicked directs you to your phone’s notification settings, which can only be accessed on a mobile device.'
        )}
      </p>
    </div>
  )
}

/**
 * Used for mobile notifications messaging
 * -------------------------------------------------------------------------- */
function GeneralError() {
  const { t } = useTranslation()
  return (
    <div className="content">
      <h1>{t('error:title', 'Oops! Something’s gone awry...')}</h1>
      <p data-cy="error-message">
        {t(
          'error:message',
          `There’s been an error. Try refreshing your page and see if that fixes things. If you’re still seeing the issue, please contact our support team.`
        )}
      </p>

      <a className="button primary large" href="https://help.getpocket.com/">
        {t('error:contact', 'Contact Support')}
      </a>
    </div>
  )
}

/**
 * Maintenance
 * -------------------------------------------------------------------------- */
function UserNotification({ birth, accountCreationDate }) {
  return (
    <div className="content">
      <h1>Welcome to the trailhead</h1>
      <p data-cy="error-message">
      Your account was created on {birth} ... or was it {accountCreationDate}
      </p>
    </div>
  )
}

/**
 * Wat??
 * -------------------------------------------------------------------------- */
function ImpossibleError() {
  return (
    <div className="content">
      <h1>How did you...</h1>
      <p data-cy="error-message">
        This is an internal error ... we must have taken a wrong turn somewhere ...
      </p>
    </div>
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
