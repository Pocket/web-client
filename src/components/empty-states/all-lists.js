import { css } from 'linaria'
import BorderSVG from 'static/images/sunken-treasure-chest.svg'
import { PlaylistAddIcon } from 'components/icons/PlaylistAddIcon'

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
  const onCreateList = () => {
    handleCreate('empty-all-lists')
  }

  return (
    <div className={emptyStyles}>
      <img src={BorderSVG.src} alt="" />
      <p>Create your first list.</p>
      <button className="outline" onClick={onCreateList}>
        <PlaylistAddIcon /> Create list
      </button>
    </div>
  )
}
