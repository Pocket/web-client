import { css } from '@emotion/css'
import { useTranslation } from 'next-i18next'

const pocketAppsStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
`

export const PocketApps = ({ appIds, ConnectedApp }) => {
  const { t } = useTranslation()
  return appIds?.length ? (
    <section className={pocketAppsStyle}>
      <h2 id="pocket-applications">{t('account:pocket-applications', 'Pocket Applications')}</h2>
      <div className="sectionBody">
        <div className="helperText full">
          {t(
            'account:pocket-applications-logged-in',
            'You are currently logged in to Pocket in these applications:'
          )}
        </div>
        {appIds.map((appId) => (
          <ConnectedApp key={appId} appId={appId} />
        ))}
      </div>
    </section>
  ) : null
}
