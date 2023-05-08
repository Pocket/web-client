import Link from 'next/link'
import { css } from 'linaria'
import BorderSVG from 'static/images/sunken-treasure-chest.svg'
import { useTranslation } from 'react-i18next'

const emptyStyles = css`
  text-align: center;
  img {
    margin: 52px 0;
  }
`

export const EmptyIndividualLists = ({ handleClick }) => {
  const { t } = useTranslation()

  return (
    <div className={emptyStyles}>
      <img src={BorderSVG.src} alt="" />
      <p>
        {t('lists:add-items-to-your-list', 'Add items to your list. Go to Saves to get started.')}
      </p>
      <Link href="/saves" className="button outline" onClick={handleClick}>
        {t('lists:go-to-saves', 'Go to Saves')}
      </Link>
    </div>
  )
}
