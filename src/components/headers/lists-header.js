import { css, cx } from '@emotion/css'
import { savesHeaderStyle } from './saves-header'
import { ListSort } from 'components/list-sort/list-sort'
import { AddIcon } from 'components/icons/AddIcon'
import { FiltersAltIcon } from 'components/icons/FiltersAltIcon'
import { SortOrderIcon } from 'components/icons/SortOrderIcon'
import Avatar from 'components/avatar/avatar'
import { SaveListButton } from 'components/content-saving/save-list'
import { IosShareIcon } from 'components/icons/IosShareIcon'
import { breakpointSmallTablet } from 'common/constants'
import { breakpointSmallHandset } from 'common/constants'
import { breakpointLargeHandset } from 'common/constants'
import { PublicListUrl } from 'components/shareable-lists/public-list-url'
import { useTranslation } from 'next-i18next'
import { VisibilityOptions } from 'components/shareable-lists/visibility-options'

const listHeaderStyles = css`
  padding-bottom: 22px;

  &.list-individual {
    display: block;
  }

  .headline {
    h1 {
      margin-bottom: 4px;
    }

    .description {
      margin-bottom: 8px;
      padding-right: 16px;
      font-size: 14px;
      line-height: 20px;
      white-space: pre-wrap;
    }
  }

  .list-actions,
  .reorder {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }

  .actions-start,
  .actions-end {
    * + button {
      margin-left: 12px;
    }
  }

  .reorder {
    justify-content: end;

    button + button {
      margin-left: 12px;
    }
  }

  .create-sort {
    display: flex;
    align-items: center;

    select {
      min-width: 100px;
      height: 1.875rem;
      padding: 0 12px;
      cursor: pointer;
    }
  }

  ${breakpointLargeHandset} {
    .list-actions {
      display: block;

      .actions-end {
        display: flex;
        flex-direction: column-reverse;
      }

      .actions-start,
      .actions-end {
        button {
          width: 100%;
          margin-left: 0;
          margin-top: 12px;
        }
      }
    }
  }

  ${breakpointSmallHandset} {
    .reorder {
      button + button {
        margin-left: 8px;
      }

      .actions-end {
        display: flex;
        align-items: center;
        width: 100%;
      }

      .save {
        flex-grow: 2;
      }

      .cancel {
        flex-grow: 1;
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
      white-space: pre-wrap;
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

  .share-save {
    display: flex;

    .share {
      margin-right: 12px;
    }
  }

  ${breakpointSmallTablet} {
    .headline {
      p {
        margin-bottom: 12px;
      }
    }
    .list-info {
      flex-direction: column;
      align-items: flex-start;
      .list-user-avatar {
        margin-left: 0;
      }
      .share-save {
        margin-top: 12px;
        width: 100%;
        button {
          flex-grow: 1;
        }
      }
    }
  }
`

export const ListsAllHeader = ({ sortOrder, handleCreateList, handleNewest, handleOldest }) => {
  const { t } = useTranslation()

  const onCreateList = () => {
    handleCreateList('header')
  }

  return (
    <header className={cx(savesHeaderStyle, listHeaderStyles)}>
      <h1 className="pageTitle" data-cy="page-title">
        {t('list:all-lists', 'All Lists')}
      </h1>

      <div className="create-sort">
        <button onClick={onCreateList} className="tiny">
          <AddIcon /> {t('list:create-list', 'Create List')}
        </button>
        <ListSort sortOrder={sortOrder} handleNewest={handleNewest} handleOldest={handleOldest} />
      </div>
    </header>
  )
}

export const ListIndividualHeader = ({
  enrolledPilot,
  enrolledDev,
  title,
  description,
  externalId,
  slug,
  status,
  listItemNoteVisibility,
  handleSetStatus,
  handleEdit,
  handleSort,
  handleCopyUrl,
  handleOpenUrl
}) => {
  const { t } = useTranslation()

  const enrolledInternal = enrolledDev || enrolledPilot
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

      <div className="list-actions">
        <div className="actions-start">
          {enrolledInternal && isPublic ? (
            <VisibilityOptions
              status={status}
              listItemNoteVisibility={listItemNoteVisibility}
              handleSetStatus={handleSetStatus}
            />
          ) : null}
          <button onClick={handleSort} className="sort tiny outline">
            <SortOrderIcon /> {t('list:reorder', 'Reorder')}
          </button>
        </div>

        <div className="actions-end">
          <button onClick={handleEdit} className="filter tiny outline">
            <FiltersAltIcon /> {t('list:settings', 'Settings')}
          </button>
        </div>
      </div>
    </header>
  )
}

export const ListSortHeader = ({ title, description, handleSave, handleCancel }) => {
  const { t } = useTranslation()

  return (
    <header className={cx(savesHeaderStyle, listHeaderStyles, 'list-individual')}>
      <div className="headline">
        <h1 className="pageTitle" data-cy="page-title">
          {title}
        </h1>
        <p className="description">{description}</p>
      </div>

      <div className="reorder">
        <div className="actions-end">
          <button onClick={handleSave} className="tiny save">
            <SortOrderIcon /> {t('list:save-order', 'Save Order')}
          </button>

          <button onClick={handleCancel} className="tiny outline cancel">
            {t('list:cancel', 'Cancel')}
          </button>
        </div>
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
  handleSaveAll,
  handleShare
}) => {
  const { t } = useTranslation()

  const countText = listCount === 1 ? t('list:item', 'Item') : t('list:items', 'items')
  const creator = userName || t('list:pocket-user', 'Pocket User')

  return (
    <header className={publicListHeaderStyles}>
      <section className="headline">
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <section className="list-info">
        <div className="list-user-info">
          <Avatar
            src={avatarUrl}
            size="32px"
            className="list-user-avatar"
            altText={t('list:creator-alt', 'Avatar of {{creator}}', { creator })}
          />
          <span>{creator}</span> |{' '}
          <span>
            {listCount} {countText}
          </span>
        </div>

        <div className="share-save">
          <button onClick={handleShare} className="tiny share">
            <IosShareIcon /> {t('list:share', 'Share')}
          </button>
          <SaveListButton
            saveAction={handleSaveAll}
            isAuthenticated={isAuthenticated}
            saveStatus={saveStatus}
          />
        </div>
      </section>
    </header>
  )
}
