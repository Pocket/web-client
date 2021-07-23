import { css } from 'linaria'
import { useTranslation } from 'next-i18next'

const partnerStyles = css`
  font-family: 'Graphik Web';
  color: var(--color-textTertiary);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  img {
    margin-left: 0.5rem;
    width: 60px;
    height: 60px;
  }
`

const overlineStyles = css`
  color: var(--color-textTertiary);
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.014em;
`

export function Partner({partnerInfo}) {
  const { t } = useTranslation()
  const type = partnerInfo.type

  if (!type) return null

  return (
    <div className={partnerStyles}>
      { type === 'partner' ? <div>{t('partner:partner-copy', 'In partnership with')}</div> : null}
      { type === 'sponsor' ? <div>{t('partner:sponsor-copy', 'Brought to you by')}</div> : null}
      <a href={partnerInfo.url} target='_blank' rel='noopener noreferrer'>
        <img src={partnerInfo.imageUrl} alt="" />
      </a>
    </div>
  )
}

export function PartnerOverline({partnerType}) {
  const { t } = useTranslation()

  if (!partnerType) return null

  return (
    <div className={overlineStyles}>
      { partnerType === 'partner' ? t('partner:partner-overline', 'From our partners') : null}
      { partnerType === 'sponsor' ? t('partner:sponsor-overline', 'Sponsored') : null}
    </div>
  )
}
