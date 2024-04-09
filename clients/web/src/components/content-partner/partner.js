import { css } from '@emotion/css'
import { useTranslation } from 'next-i18next'

const partnerStyles = css`
  font-family: 'Graphik Web';
  color: var(--color-textSecondary);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  img {
    margin-left: 0.5rem;
    max-width: 8rem;

    .colormode-dark & {
      mix-blend-mode: exclusion;
      filter: invert(1);
    }

    .colormode-sepia & {
      mix-blend-mode: multiply;
    }
  }
`

const overlineStyles = css`
  color: var(--color-textSecondary);
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.014em;
  line-height: 1.75;
  transform: translateY(-0.25rem);
`

export function Partner({ partnerInfo }) {
  const { t } = useTranslation()
  const type = partnerInfo.type

  if (!type) return null

  const partnerTypes = {
    PARTNERED: t('partner:partner-copy', 'In partnership with'),
    SPONSORED: t('partner:sponsor-copy', 'Brought to you by')
  }
  const attribution = partnerTypes[type] || ''

  return (
    <div className={partnerStyles}>
      <div>{attribution}</div>
      <a href={partnerInfo.url} rel="noopener">
        <img src={partnerInfo.imageUrl} alt={partnerInfo.name} />
      </a>
    </div>
  )
}

export function PartnerOverline({ partnerType }) {
  const { t } = useTranslation()

  if (!partnerType) return null

  const partnerTypes = {
    PARTNERED: t('partner:partner-overline', 'From our partners'),
    SPONSORED: t('partner:sponsor-overline', 'Sponsored')
  }
  const overline = partnerTypes[partnerType] || ''

  return <div className={overlineStyles}>{overline}</div>
}
