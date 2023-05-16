import TreasureSVG from 'static/images/sunken-treasure-chest.svg'
import { emptyStyles } from './styles'
import { useTranslation } from 'react-i18next'

export const EmptySearch = () => {
  const { t } = useTranslation()

  return (
    <div className={emptyStyles}>
      <img src={TreasureSVG.src} alt="" />
      <h4>{t('empty:search-title', 'No results found')}</h4>
      <p>{t('empty:search-sub', 'Adjust your search terms and try again')}</p>
    </div>
  )
}
