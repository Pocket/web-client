import TreasureSVG from 'static/images/sunken-treasure-chest.svg'
import { emptyStyles } from './styles'
import { useTranslation } from 'next-i18next'

export const EmptyHighlights = () => {
  const { t } = useTranslation()

  return (
    <div className={emptyStyles}>
      <img src={TreasureSVG.src} alt="" aria-hidden="true" />
      <h4>{t('empty:highlights-title', 'Keep your favorite quotes here')}</h4>
      <p>
        {t(
          'empty:highlights-sub',
          'Select a line in an article, then hit ‘highlight’ to save it for later.'
        )}
      </p>
    </div>
  )
}
