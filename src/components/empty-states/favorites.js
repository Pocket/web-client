import TreasureSVG from 'static/images/sunken-treasure-chest.svg'
import { emptyStyles } from './styles'
import { FavoriteIcon } from '@ui/icons/FavoriteIcon'
import { useTranslation, Trans } from 'next-i18next'

export const EmptyFavorites = () => {
  const { t } = useTranslation()

  return (
    <div className={emptyStyles}>
      <img src={TreasureSVG.src} alt="" aria-hidden="true" />
      <h4>{t('empty:favorites-title', 'Find your favorites here')}</h4>
      <p>
        <Trans i18nKey="empty:favorites-sub">
          Hit the <FavoriteIcon /> icon to favorite an article and find it faster.
        </Trans>
      </p>
    </div>
  )
}
