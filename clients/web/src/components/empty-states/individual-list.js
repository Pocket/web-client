import Link from 'next/link'
import TreasureSVG from 'static/images/sunken-treasure-chest.svg'
import { emptyStyles } from './styles'
import { useTranslation } from 'next-i18next'

export const EmptyIndividualLists = ({ handleClick }) => {
  const { t } = useTranslation()

  return (
    <div className={emptyStyles}>
      <img src={TreasureSVG.src} alt="" aria-hidden="true" />
      <p>
        {t('list:add-items-to-your-list', 'Add items to your list. Go to Saves to get started.')}
      </p>
      <Link href="/saves" className="button outline" onClick={handleClick}>
        {t('list:go-to-saves', 'Go to Saves')}
      </Link>
    </div>
  )
}
