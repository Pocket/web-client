import { css, cx } from 'linaria'
import { savesHeaderStyle } from './saves-header'
import { ListSort } from 'components/list-sort/list-sort'
import { PlaylistAddIcon } from 'components/icons/PlaylistAddIcon'
import { Button } from 'components/buttons/button'

const listHeaderStyles = css`
  .create-sort {
    display: flex;

    .icon {
      height: 20px;
    }
  }
`

export const ListsHeader = ({ sortOrder, handleCreateList, handleNewest, handleOldest }) => {
  return (
    <header className={cx(savesHeaderStyle, listHeaderStyles)}>
      <h1 className="pageTitle" data-cy="page-title">
        All Lists
      </h1>

      <div className="create-sort">
        <Button onClick={handleCreateList} size="tiny"><PlaylistAddIcon /> Create List</Button>
        <ListSort sortOrder={sortOrder} handleNewest={handleNewest} handleOldest={handleOldest} />
      </div>
    </header>
  )
}
