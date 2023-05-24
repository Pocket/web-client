import TreasureSVG from 'static/images/sunken-treasure-chest.svg'
import { emptyStyles } from './styles'
import { useTranslation } from 'next-i18next'

export const EmptySearch = () => {
  const { t } = useTranslation()

  return (
    <div className={emptyStyles}>
      <img src={TreasureSVG.src} alt="" aria-hidden="true" />
      <h4>{t('empty:search-title', 'No results found')}</h4>
      <p>{t('empty:search-sub', 'You don’t have any saves that match this search inquiry.')}</p>
    </div>
  )
}
