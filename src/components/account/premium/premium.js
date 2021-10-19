import { css } from 'linaria'
import { Button } from '@pocket/web-ui'
import { useTranslation } from 'next-i18next'

const premiumStyle = css`
  h2 {
    font-family: var(--fontSansSerif);
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.25;
    color: var(--color-textPrimary);
  }
  .premiumBody {
    img {
      grid-column: span 5;
    }
    .premiumCopy {
      grid-column: span 5;
    }
  }
`

export const Premium = ({ isPremium }) => {
  const { t } = useTranslation()
  return (
    <section className={premiumStyle}>
      <h2>{t('account:premium', 'Premium')}</h2>
      <div className="sectionBody premiumBody">
        <img
          src="https://assets.getpocket.com/web/premium/Modules/Hero/Images/tree.deff18f2551b30c90de43c46e8f147fb.svg"
          alt="Pocket Premium"
        />
        <div className="premiumCopy">
          <h3>{t('account:premium-heading', 'Your path to ideas, inspiration, and focus.')}</h3>
          <p>
            {t(
              'account:premium-copy',
              'It’s a wild internet out there. Pocket Premium gives you a beautiful, ad-free space to absorb stories at your own pace—and keep them for however long you’d like.'
            )}
          </p>
          {isPremium ? (
            <a href="https://getpocket.com/premium/settings">
              <Button variant="brand">{t('account:premium-manage', 'Manage Subscription')}</Button>
            </a>
          ) : (
            <a href="https://getpocket.com/premium">
              <Button variant="brand">
                {t('account:premium-subscrive', 'Get Pocket Premium')}
              </Button>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
