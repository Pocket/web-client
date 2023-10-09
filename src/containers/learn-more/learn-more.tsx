import { useSelector, useDispatch } from 'react-redux'
import { useTranslation, Trans } from 'next-i18next'
import { css, cx } from '@emotion/css'
import Layout from 'layouts/fxa'
import { LogoMark } from 'components/logo/logo'
import { PageContainer } from 'components/page-container/page-container'
import { AccountDeleteModal } from 'containers/account/privacy/confirm-delete'
import { AccountClearModal } from 'containers/account/privacy/confirm-clear'
import { accountDelete } from 'containers/account/privacy/privacy.state'
import { breakpointLargeHandset } from 'common/constants'
import { setCookie } from 'nookies'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

const leanMoreStyles = css`
  background-color: var(--color-teal100);
  text-align: center;
  padding: 1rem 0 2rem;
  .logo {
    display: inline-block;
    width: 42px;
    height: 42px;
    margin: 0 0 1rem;
  }
  h1 {
    font-family: var(--fontSerifAlt);
    max-width: 700px;
    margin: 0 auto 2rem;
    text-align: center;
    font-size: 40px;
    font-weight: 500;
    line-height: 55px;
    letter-spacing: 0em;
  }
  ul {
    margin: 0 0 2rem;
    list-style-position: inside;
  }

  ${breakpointLargeHandset} {
    button {
      width: 100%;
      font-size: 0.875rem;
    }
    ul {
      text-align: left;
      font-size: 0.875rem;
      list-style-position: outside;
    }
  }
`

const noUpgradeStyles = css`
  h2 {
    font-family: var(--fontSerifAlt);
    font-size: 23px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0px;
    text-align: center;
    margin: 1rem 0 2.5rem;
  }

  ul {
    max-width: 936px;
    margin: 0 auto;
    padding: 0;
  }

  li {
    grid-template-columns: auto 9.375rem;
    grid-column-gap: 2rem;
    display: grid;
    align-items: center;
    padding: 0.875rem 0;
    border: 1px solid var(--color-dividerTertiary);
    border-width: 0 0 1px;
    h3 {
      margin: 0 0 1rem;
      font-size: 1.1875rem;
      font-weight: 600;
      line-height: 1.5rem;
      letter-spacing: 0px;
      text-align: left;
    }
    p {
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.25;
      text-align: left;
    }

    ${breakpointLargeHandset} {
      grid-template-columns: 1fr;
      padding: 1rem;
      border-width: 1px;
      margin-bottom: 2rem;
      border-radius: 1rem;
    }
  }

  a {
    text-align: center;
  }
`

export default function LearnMore() {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const featureState = useSelector((state: any) => state.features)
  const enrolledRebranding = featureFlagActive({ flag: 'fxa.rebranding', featureState })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isPremium = useSelector((state: any) => state.user.premium_status === '1')

  const handleUpgrade = () => {
    dispatch(sendSnowplowEvent('learnmore.upgrade'))
    // Set Cookie for FF Migration
    setCookie(null, 'fxa_migration', '1', {
      maxAge: 10 * 60,
      path: '/'
    })
    window.location.assign('/ff_signup?utm_campaign=pocket_migration')
  }

  const handleFaq = () => dispatch(sendSnowplowEvent('learnmore.upgrade'))
  const handleExportSaves = () => dispatch(sendSnowplowEvent('learnmore.exportsaves'))
  const handleCancelPremium = () => dispatch(sendSnowplowEvent('learnmore.cancelpremium'))
  const handleDeleteAccount = () => {
    dispatch(sendSnowplowEvent('learnmore.deleteaccount'))
    dispatch(accountDelete())
  }

  return (
    <Layout title={`Pocket - ${t('learn-more:title', 'Learn more about Firefox migration')}`}>
      <main>
        <div className={cx('main', leanMoreStyles)}>
          <PageContainer>
            <LogoMark className="logo" />
            <h1>
              {enrolledRebranding ? (
                <Trans i18nKey="learn-more:update-header-rebrand">Update your Pocket login</Trans>
              ) : (
                <Trans i18nKey="learn-more:update-header">
                  Update your Pocket login to a Firefox&nbsp;account
                </Trans>
              )}
            </h1>
            <ul>
              <li>
                {t(
                  'learn-more:condition-usage',
                  'You will still be able to use any browser, our iOS or Android apps to access Pocket'
                )}
              </li>
              <li>
                {enrolledRebranding
                  ? t(
                      'learn-more:condition-benefit-rebrand',
                      'Benefits include better account security'
                    )
                  : t(
                      'learn-more:condition-benefits',
                      'Benefits of a Firefox account, powered by Mozilla, include better account security'
                    )}
              </li>
              <li>
                {enrolledRebranding
                  ? t(
                      'learn-more:condition-pocket-access-rebrand',
                      'If you do not update, you cannot access Pocket'
                    )
                  : t(
                      'learn-more:condition-pocket-access',
                      'If you do not update to a Firefox account, you cannot access Pocket'
                    )}
              </li>
            </ul>
            <button className="large" onClick={handleUpgrade}>
              {t('learn-more:update-button', 'Update account')}
            </button>
          </PageContainer>
        </div>
        <PageContainer className={noUpgradeStyles}>
          <h2>
            {t('learn-more:no-update-header', 'Don’t want to update?')}
            <br />
            {t('learn-more:no-update-options', 'Here are your other options:')}
          </h2>

          <ul>
            <li>
              <div>
                <h3>{t('learn-more:faq-header', 'Frequently asked questions')}</h3>
                <p>
                  {t(
                    'learn-more:faq-body',
                    'Review our Frequently Asked Questions about the switch.'
                  )}
                </p>
              </div>
              <a
                onClick={handleFaq}
                className="button secondary"
                href="https://help.getpocket.com/article/1187-pocket-migration-to-firefox-accounts"
                target="_blank">
                {t('learn-more:faq-button', 'Learn more')}
              </a>
            </li>
            <li>
              <div>
                <h3>{t('learn-more:export-header', 'Export saves')}</h3>
                <p>
                  {t(
                    'learn-more:export-body',
                    'Visit this page to export your Saves to an HTML file. (Note: may not include all tags.)'
                  )}
                </p>
              </div>
              <a
                onClick={handleExportSaves}
                className="button secondary"
                href="http://getpocket.com/export">
                {t('learn-more:export-button', 'Export saves')}
              </a>
            </li>
            {isPremium ? (
              <li>
                <div>
                  <h3>{t('learn-more:cancel-header', 'Cancel Premium subscription')}</h3>
                  <p>
                    {t(
                      'learn-more:cancel-body',
                      'To cancel your Premium subscription, visit this page which explains canceling for each subscription platform. If you have a subscription, you must cancel it before deleting your account.'
                    )}
                  </p>
                </div>
                <a
                  onClick={handleCancelPremium}
                  className="button brand"
                  href="https://getpocket.com/premium_manage_subscription">
                  {t('learn-more:cancel-button', 'Cancel Premium')}
                </a>
              </li>
            ) : null}
            <li>
              <div>
                <h3>{t('learn-more:delete-header', 'Delete account')}</h3>
                <p>
                  {t(
                    'learn-more:delete-body',
                    'Permanently delete your Pocket account. This will delete your account and all items within it.'
                  )}
                </p>
              </div>
              <button className="brand" onClick={handleDeleteAccount}>
                {t('learn-more:delete-button', 'Delete account')}
              </button>
            </li>
          </ul>
        </PageContainer>
      </main>
      <AccountDeleteModal isPremium={isPremium} />
      <AccountClearModal />
    </Layout>
  )
}
