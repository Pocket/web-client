import TreasureSVG from 'static/images/sunken-treasure-chest.svg'
import { emptyStyles } from './styles'
import { useTranslation } from 'next-i18next'

export const EmptyTags = () => {
  const { t } = useTranslation()

  return (
    <div className={emptyStyles}>
      <img src={TreasureSVG.src} alt="" aria-hidden="true" />
      <h4>{t('empty:tags-title', 'Organize your saves')}</h4>
      <p>{t('empty:tags-sub', 'Tag your saves by topic to quickly find them later.')}</p>
    </div>
  )
}
