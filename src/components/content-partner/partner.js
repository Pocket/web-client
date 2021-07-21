import { css } from 'linaria'
import { useTranslation } from 'next-i18next'

const partnerStyles = css`
  font-family: 'Graphik Web';
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  img {
    margin-left: 1rem;
    width: 60px;
    height: 60px;
  }
`

const overlineStyles = css`
  color: var(--color-textTertiary);
  font-weight: 300;
  font-size: 1.25em;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`

export function Partner({partnerInfo}) {
  const { t } = useTranslation()
  const type = partnerInfo.type

  if (!type) return null

  return (
    <div className={partnerStyles}>
      { type === 'partner' ? <div>{t('partner-info:partner-copy', 'In partnership with:')}</div> : null}
      { type === 'sponsor' ? <div>{t('partner-info:sponsor-copy', 'Brought to you by:')}</div> : null}
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
      { partnerType === 'partner' ? t('partner-card:partner-copy', 'From our partners') : null}
      { partnerType === 'sponsor' ? t('partner-card:sponsor-copy', 'Sponsored') : null}
    </div>
  )
}
