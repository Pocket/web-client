import { css } from 'linaria'
import { useTranslation } from 'next-i18next'

const notficationsStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
`

export const Notifications = ({
  sendMarketing = false,
  hitsFrequency,
  onMarketingToggle,
  onFrequencyChange
}) => {
  const { t } = useTranslation()

  return (
    <section className={notficationsStyle}>
      <h2>{t('account:notifications', 'Notifications')}</h2>
      <div className="sectionBody emailBody">
        <label htmlFor="productUpdates" className="flush">
          {t('account:notifications-product', 'Notify me of product updates')}
        </label>
        <input
          type="checkbox"
          name="productUpdates"
          id="productUpdates"
          className="toggle"
          checked={sendMarketing}
          onChange={onMarketingToggle}
        />

        <label htmlFor="pockethits" className="flush">
          {t('account:pocket-hits', 'Pocket Hits')}
        </label>
        <select value={hitsFrequency} onChange={onFrequencyChange}>
          <option disabled>———</option>
          <option value="daily">{t('account:pocket-hits-daily', 'Daily')}</option>
          <option value="weekly">{t('account:pocket-hits-weekly', 'Once a week')}</option>
          <option value="never">
            {t('account:pocket-hits-never', 'Unsubscribe: Opt out of Pocket Hits')}
          </option>
        </select>
        <div className="helperText full">
          {t(
            'account:pocket-hits-disclaimer',
            'Pocket Hits is a curated newsletter showcasing the very best stories in Pocket delivered by email.'
          )}
        </div>
      </div>
    </section>
  )
}
