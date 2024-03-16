import { css } from '@emotion/css'
import { useTranslation } from 'next-i18next'

const brazeStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
`

export const Braze = ({ subscribed = false, onBrazeToggle }) => {
  const { t } = useTranslation()

  return (
    <section className={brazeStyle}>
      <h2 id="braze">{t('account:tracking-title', 'Tracking for in-app messaging')}</h2>
      <div className="sectionBody">
        <label htmlFor="brazeSubscription" className="flush">
          {t(
            'account:tracking-desc',
            'Allow tracking in Braze so we can message you on Pocket’s website.'
          )}
        </label>
        <input
          type="checkbox"
          name="brazeSubscription"
          id="brazeSubscription"
          className="toggle"
          checked={subscribed}
          onChange={onBrazeToggle}
        />
      </div>
    </section>
  )
}
