import { css } from '@emotion/css'
import { useTranslation } from 'next-i18next'

const servicesStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
`

export const Services = ({ appIds, ConnectedApp }) => {
  const { t } = useTranslation()
  return appIds?.length ? (
    <section className={servicesStyle}>
      <h2 id="connected-services">{t('account:connected-services', 'Connected Services')}</h2>
      <div className="sectionBody">
        <div className="helperText full">
          {t(
            'account:connected-services-logged-in',
            'You have authorized Pocket to access these services:'
          )}
        </div>
        {appIds.map((appId) => (
          <ConnectedApp key={appId} appId={appId} />
        ))}
      </div>
    </section>
  ) : null
}
