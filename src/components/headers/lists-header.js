import Link from 'next/link'
import { css, cx } from 'linaria'
import { savesHeaderStyle } from './saves-header'
import { ListSort } from 'components/list-sort/list-sort'
import { PlaylistAddIcon } from 'components/icons/PlaylistAddIcon'
import { FiltersAltIcon } from 'components/icons/FiltersAltIcon'
import { LockIcon } from 'components/icons/LockIcon'
import { GlobeIcon } from 'components/icons/GlobeIcon'
import { Button } from 'components/buttons/button'

const listHeaderStyles = css`
  .headline {
    h1 {
      margin-bottom: 4px;
    }

    .description {
      margin-bottom: 8px;
      padding-right: 16px;
      font-size: 14px;
      line-height: 20px;
    }

    .chip {
      display: inline-block;
      padding: 2px 8px;
      margin-bottom: 22px;
      font-size: 14px;
      background: #F9FAFB;
      color: var(--color-textSecondary);
      border-radius: 100px;

      &.public {
        background: var(--color-teal100);
        color: var(--color-actionPrimary);
      }
    }

    a {
      margin-left: 10px;
      font-size: 14px;
    }
  }

  .create-sort {
    display: flex;

    .filter {
      margin: 0 0 0 12px;
      padding: 0.25rem 0.5rem;
      background: transparent;
      color: var(--color-primary);
    }

    .icon {
      height: 20px;
    }
  }
`

export const ListsAllHeader = ({ sortOrder, handleCreateList, handleNewest, handleOldest }) => {
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

export const ListIndividualHeader = ({
  title,
  description,
  status,
  userId,
  slug,
  sortOrder,
  handlePublish,
  handleShare,
  handleEdit,
  handleNewest,
  handleOldest
}) => {
  const url = `/${userId}/list/${slug}`
  const isPrivate = status === 'PRIVATE'

  return (
    <header className={cx(savesHeaderStyle, listHeaderStyles)}>
      <div className="headline">
        <h1 className="pageTitle" data-cy="page-title">
          {title}
        </h1>
        <p className="description">{description}</p>
        {isPrivate ? (
          <div className="chip private"><LockIcon /> Private</div>
        ) : (
          <>
            <div className="chip public"><GlobeIcon /> Public</div>{' '}
            <Link href={url}>{`https://getpocket.com${url}`}</Link>
          </>
        )}
      </div>

      <div className="create-sort">
        {isPrivate ? (
          <Button onClick={handlePublish} size="tiny">Make list public</Button>
        ) : (
          <Button onClick={handleShare} size="tiny">Share list</Button>
        )}

        <button onClick={handleEdit} className="filter"><FiltersAltIcon /></button>
        <ListSort sortOrder={sortOrder} handleNewest={handleNewest} handleOldest={handleOldest} />
      </div>
    </header>
  )
}
