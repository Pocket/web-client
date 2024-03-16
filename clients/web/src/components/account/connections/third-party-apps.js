import { css } from '@emotion/css'
import { useTranslation } from 'next-i18next'

const thirdPartyStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
  .helperText {
    padding-top: 2rem;
  }
`

export const ThirdParty = ({ appIds, ConnectedApp }) => {
  const { t } = useTranslation()
  return appIds?.length ? (
    <section className={thirdPartyStyle}>
      <h2 id="third-party-apps">{t('account:third-party-apps', 'Third Party Applications')}</h2>
      <div className="sectionBody thirdPartyBody">
        {appIds.map((appId) => (
          <ConnectedApp key={appId} appId={appId} />
        ))}
        <div className="helperText full">
          {t(
            'account:third-pary-apps-disclaimer',
            'This page will not list 3rd party applications where you have entered your Pocket username/password into the app itself. If you would like to remove access to those apps, you will need to remove your Pocket credentials from those apps directly or change your password.'
          )}
        </div>
      </div>
    </section>
  ) : null
}
