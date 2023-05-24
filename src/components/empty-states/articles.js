import TreasureSVG from 'static/images/sunken-treasure-chest.svg'
import { emptyStyles } from './styles'
import { useTranslation } from 'next-i18next'

export const EmptyArticles = () => {
  const { t } = useTranslation()

  return (
    <div className={emptyStyles}>
      <img src={TreasureSVG.src} alt="" aria-hidden="true" />
      <h4>{t('empty:articles-title', 'Here’s where you’ll see the articles you’ve saved.')}</h4>
      <p>{t('empty:articles-sub', 'Go to Discover to see our latest article recommendations.')}</p>
    </div>
  )
}
