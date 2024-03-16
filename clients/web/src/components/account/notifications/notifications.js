import { css } from '@emotion/css'
import { useTranslation } from 'next-i18next'

const notficationsStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
`

export const Notifications = ({ sendMarketing = false, onMarketingToggle }) => {
  const { t } = useTranslation()

  return (
    <section className={notficationsStyle}>
      <h2 id="notifications">{t('account:notifications', 'Notifications')}</h2>
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
      </div>
    </section>
  )
}
