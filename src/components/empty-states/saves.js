import LibrarySVG from 'static/images/home/myList.svg'
import { emptyStyles } from './styles'
import { useTranslation } from 'next-i18next'

export const EmptySaves = () => {
  const { t } = useTranslation()

  return (
    <div className={emptyStyles}>
      <img src={LibrarySVG.src} alt="" className="library" aria-hidden="true" />
      <h4>{t('empty:unread-title', 'Start saving to your Pocket')}</h4>
    </div>
  )
}
