import { css } from 'linaria'
import BorderSVG from 'static/images/sunken-treasure-chest.svg'
import { ListAddIcon } from 'components/icons/ListAddIcon'
import { useTranslation } from 'react-i18next'

const emptyStyles = css`
  text-align: center;
  img {
    margin: 52px 0;
  }

  button {
    color: var(--color-textPrimary);
  }
`

export const EmptyAllLists = ({ handleCreate }) => {
  const { t } = useTranslation()

  const onCreateList = () => {
    handleCreate('empty-all-lists')
  }

  return (
    <div className={emptyStyles}>
      <img src={BorderSVG.src} alt="" />
      <p>{t('list:create-your-first-list', 'Create your first list.')}</p>
      <button className="outline" onClick={onCreateList}>
        <ListAddIcon /> {t('list:create-list', 'Create list')}
      </button>
    </div>
  )
}
