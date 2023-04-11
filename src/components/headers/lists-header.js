import { css, cx } from 'linaria'
import { useTranslation } from 'next-i18next'
import { savesHeaderStyle } from './saves-header'
import { ListSort } from 'components/list-sort/list-sort'
import { ListAddIcon } from 'components/icons/ListAddIcon'
import { FiltersAltIcon } from 'components/icons/FiltersAltIcon'
import Avatar from 'components/avatar/avatar'
import { SaveListButton } from 'components/content-saving/save-list'
import { IosShareIcon } from 'components/icons/IosShareIcon'
import { ListStatusToggle } from 'components/shareable-lists/list-status-toggle'
import { breakpointSmallTablet } from 'common/constants'
import { PublicListUrl } from 'components/shareable-lists/public-list-url'

const listHeaderStyles = css`
  padding-bottom: 22px;

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
  }

  .create-sort {
    display: flex;

    .share {
      margin-right: 12px;
    }

    .filter {
      margin-left: 12px;
    }

    select {
      min-width: 100px;
      height: 1.875rem;
      padding: 0 12px;
      cursor: pointer;
    }
  }

  ${breakpointSmallTablet} {
    &.list-individual {
      flex-direction: column;

      .create-sort {
        margin-top: 12px;
      }
    }
  }
`

const publicListHeaderStyles = css`
  padding-bottom: 22px;
  border-bottom: 1px solid var(--color-dividerTertiary);

  .headline {
    h1 {
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    p {
      font-size: 14px;
      line-height: 1.4;
      margin-bottom: 68px;
    }
  }

  .list-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list-user-info {
    display: flex;
    align-items: center;
    color: var(--color-textPrimary);
    font-size: 14px;

    span {
      margin: 0 8px;
    }

    .icon {
      margin: 0;
    }
  }
`

export const ListsAllHeader = ({ sortOrder, handleCreateList, handleNewest, handleOldest }) => {
  const onCreateList = () => {
    handleCreateList('header')
  }

  return (
    <header className={cx(savesHeaderStyle, listHeaderStyles)}>
      <h1 className="pageTitle" data-cy="page-title">
        All Lists
      </h1>

      <div className="create-sort">
        <button onClick={onCreateList} className="tiny">
          <ListAddIcon /> Create List
        </button>
        <ListSort sortOrder={sortOrder} handleNewest={handleNewest} handleOldest={handleOldest} />
      </div>
    </header>
  )
}

export const ListIndividualHeader = ({
  title,
  description,
  status,
  externalId,
  slug,
  handleSetStatus,
  handleShare,
  handleEdit,
  handleCopyUrl,
  handleOpenUrl
}) => {
  const isPublic = status === 'PUBLIC'
  const publicListInfo = {
    externalId,
    status,
    slug
  }

  return (
    <header className={cx(savesHeaderStyle, listHeaderStyles, 'list-individual')}>
      <div className="headline">
        <h1 className="pageTitle" data-cy="page-title">
          {title}
        </h1>
        <p className="description">{description}</p>
        <PublicListUrl
          publicListInfo={publicListInfo}
          handleCopyUrl={handleCopyUrl}
          handleOpenUrl={handleOpenUrl}
        />
      </div>

      <div className="create-sort">
        {isPublic ? (
          <button onClick={handleShare} className="tiny share">
            <IosShareIcon /> Share list
          </button>
        ) : null}

        <ListStatusToggle status={status} handleSetStatus={handleSetStatus} />

        <button onClick={handleEdit} className="filter tiny outline">
          <FiltersAltIcon /> Settings
        </button>
      </div>
    </header>
  )
}

export const ListPublicHeader = ({
  title,
  description,
  avatarUrl,
  userName,
  listCount,
  isAuthenticated,
  saveStatus,
  handleSaveAll
}) => {
  const countText = listCount === 1 ? 'Item' : 'Items'

  return (
    <header className={publicListHeaderStyles}>
      <section className="headline">
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <section className="list-info">
        <div className="list-user-info">
          <Avatar src={avatarUrl} size="32px" />
          <span>{userName || 'Pocket User'}</span> |{' '}
          <span>
            {listCount} {countText}
          </span>
        </div>

        <SaveListButton
          saveAction={handleSaveAll}
          isAuthenticated={isAuthenticated}
          saveStatus={saveStatus}
        />
      </section>
    </header>
  )
}
