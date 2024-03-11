import TreasureSVG from 'static/images/sunken-treasure-chest.svg'
import { emptyStyles } from './styles'
import { AddIcon } from '@ui/icons/AddIcon'
import { useTranslation } from 'next-i18next'

export const EmptyAllLists = ({ handleCreate }) => {
  const { t } = useTranslation()

  const onCreateList = () => {
    handleCreate('empty-all-lists')
  }

  return (
    <div className={emptyStyles}>
      <img src={TreasureSVG.src} alt="" aria-hidden="true" />
      <p>{t('list:create-your-first-list', 'Create your first list.')}</p>
      <button className="outline" onClick={onCreateList}>
        <AddIcon /> {t('list:create-list', 'Create list')}
      </button>
    </div>
  )
}
