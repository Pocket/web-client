import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { css, cx } from '@emotion/css'
import Layout from 'layouts/fxa'
import { LogoMark } from 'components/logo/logo'
import { PageContainer } from 'components/page-container/page-container'
import { AccountDeleteModal } from 'containers/account/privacy/confirm-delete'
import { AccountClearModal } from 'containers/account/privacy/confirm-clear'
import { accountDelete } from 'containers/account/privacy/privacy.state'

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
  }

  li {
    grid-template-columns: auto 9.375rem;
    grid-column-gap: 2rem;
    display: grid;
    align-items: center;
    padding: 0.875rem 0;
    border: 1px solid var(--color-grey95);
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
  }

  a {
    text-align: center;
  }
`

export default function LearnMore() {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const dispatchAccountDelete = () => dispatch(accountDelete())
  const isPremium = useSelector((state) => state.user.premium_status === '1')

  return (
    <Layout title={`Pocket - ${t('learn-more:title', 'Learn more about Firefox migration')}`}>
      <main>
        <div className={cx('main', leanMoreStyles)}>
          <PageContainer>
            <LogoMark className="logo" />
            <h1>Update your Pocket login to a Firefox&nbsp;account</h1>
            <ul>
              <li>
                You will still be able to use any browser, our iOS or Android apps to access Pocket
              </li>
              <li>
                Benefits of a Firefox account, powered by Mozilla, include better account security
              </li>
              <li>If you do not update to a Firefox account, you cannot access Pocket</li>
            </ul>

            <button className="large">Update account</button>
          </PageContainer>
        </div>
        <PageContainer className={noUpgradeStyles}>
          <h2>
            Don’t want to update?
            <br />
            Here are your other options:
          </h2>

          <ul>
            <li>
              <div>
                <h3>Frequently asked questions</h3>
                <p>Review our Frequently Asked Questions about the switch.</p>
              </div>
              <a
                className="button secondary"
                href="https://help.getpocket.com/article/1187-pocket-migration-to-firefox-accounts">
                Learn more
              </a>
            </li>
            <li>
              <div>
                <h3>Export saves</h3>
                <p>
                  Visit this page to export your Saves to an HTML file. (Note: may not include all
                  tags.)
                </p>
              </div>
              <a className="button secondary" href="http://getpocket.com/export">
                Export saves
              </a>
            </li>
            <li>
              <div>
                <h3>Cancel Premium subscription</h3>
                <p>
                  To cancel your Premium subscription, visit this page which explains canceling for
                  each subscription platform.{' '}
                  <em>
                    If you have a subscription, you must cancel it before deleting your account.
                  </em>
                </p>
              </div>
              <a className="button brand" href="https://getpocket.com/premium_manage_subscription">
                Cancel Premium
              </a>
            </li>
            <li>
              <div>
                <h3>Delete account</h3>
                <p>
                  Permanently delete your Pocket account. This will delete your account and all
                  items within it.
                </p>
              </div>
              <button className="brand" onClick={dispatchAccountDelete}>
                Delete account
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
