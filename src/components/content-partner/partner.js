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

export function Partner({partnerInfo}) {
  const { t } = useTranslation()
  const type = partnerInfo.type

  if (!type) return

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
