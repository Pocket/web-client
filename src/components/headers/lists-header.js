import { css, cx } from 'linaria'
import { savesHeaderStyle } from './saves-header'
import { ListSort } from 'components/list-sort/list-sort'
import { AddIcon } from 'components/icons/AddIcon'
import { Button } from 'components/buttons/button'

const listHeaderStyles = css`
  .create-sort {
    display: flex;
  }
`

export const ListsHeader = ({ sortOrder, handleCreateList, handleNewest, handleOldest }) => {
  return (
    <header className={cx(savesHeaderStyle, listHeaderStyles)}>
      <h1 className="pageTitle" data-cy="page-title">
        All Lists
      </h1>

      <div className="create-sort">
        <Button onClick={handleCreateList} size="tiny"><AddIcon /> Create List</Button>
        <ListSort sortOrder={sortOrder} handleNewest={handleNewest} handleOldest={handleOldest} />
      </div>
    </header>
  )
}
