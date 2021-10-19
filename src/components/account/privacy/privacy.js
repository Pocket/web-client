import { css } from 'linaria'
import { Button } from '@pocket/web-ui'
import { useTranslation } from 'next-i18next'
const privacyStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
`

export const Privacy = ({ accountClear, accountDelete, rssProtect, rssProtected }) => {
  const { t } = useTranslation()
  return (
    <section className={privacyStyle}>
      <h2>{t('account:privacy', 'Privacy')}</h2>
      <div className="sectionBody">
        {/* Leaving this here until the endpoint is properly sorted out
        <div className="toggleWrap">
          <label htmlFor="profilePrivate" className="flush">
            Make my profile private
          </label>
          <input type="checkbox" name="profilePrivate" id="profilePrivate" className="toggle" />
        </div> 
        */}

        <div className="toggleWrap">
          <label htmlFor="rssPasswords" className="flush">
            {t('account:privacy-rss', 'Disable password protection on my RSS feeds')}
          </label>
          <input
            type="checkbox"
            name="rssPasswords"
            id="rssPasswords"
            className="toggle"
            checked={rssProtected}
            onChange={rssProtect}
          />
        </div>

        {/* Leaving this here until the export strat is revisited
        <label htmlFor="something" className="flush connectionLabel labelWithContext">
          Export my Pocket data
          <div className="helperText">Export your Pocket data in a portable HTML file</div>
        </label>
        <div className="actionInline">
          <Button variant="secondary">Export data</Button>
        </div>
        */}

        <label htmlFor="something" className="connectionLabel labelWithContext">
          {t('account:privacy-clear-header', 'Clear my Pocket data')}
          <div className="helperText full">
            {t(
              'account:privacy-clear-helper',
              'This will irrevocably delete the items in your list & archive.'
            )}
          </div>
        </label>
        <div className="actionInline">
          <Button variant="secondary" onClick={accountClear}>
            {t('account:privacy-clear-data', 'Clear data')}
          </Button>
        </div>

        <label htmlFor="something" className="connectionLabel labelWithContext">
          {t('account:privacy-delete-my-account', 'Delete my Pocket account')}
          <div className="helperText full">
            {t(
              'account:privacy-delete-helper',
              'This will delete your account and all items within it.'
            )}
          </div>
        </label>
        <div className="actionInline">
          <Button variant="secondary" onClick={accountDelete}>
            {t('account:privacy-delete-account', 'Delete Account')}
          </Button>
        </div>
      </div>
    </section>
  )
}
