import TreasureSVG from 'static/images/sunken-treasure-chest.svg'
import { emptyStyles } from './styles'
import { useTranslation } from 'next-i18next'

export const EmptyVideos = () => {
  const { t } = useTranslation()

  return (
    <div className={emptyStyles}>
      <img src={TreasureSVG.src} alt="" aria-hidden="true" />
      <h4>{t('empty:videos-title', 'Videos you’ve saved will show up here')}</h4>
    </div>
  )
}
