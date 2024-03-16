import { css } from '@emotion/css'
import { useTranslation } from 'next-i18next'
import { breakpointSmallHandset } from 'common/constants'
import { breakpointLargeHandset } from 'common/constants'
import { breakpointLargeTablet } from 'common/constants'
import { AddIcon } from '@ui/icons/AddIcon'
import { FilterMenu } from 'components/list-filter-menu/list-filter-menu'
import { ListSort } from 'components/list-sort/list-sort'

export const savesHeaderStyle = css`
  margin-bottom: var(--spacing150);
  font-family: 'Graphik Web';
  border-bottom: 1px solid var(--color-dividerTertiary);
  display: flex;
  justify-content: space-between;
  align-items: first baseline;

  h1 {
    display: inline-block;
    font-family: 'Graphik Web';
    font-style: normal;
    font-weight: 500;
    font-size: var(--fontSize150);
    line-height: 1.2;
    letter-spacing: -0.005em;
    margin-bottom: var(--spacing100);

    ${breakpointLargeTablet} {
      font-size: var(--fontSize200);
    }

    ${breakpointLargeHandset} {
      font-size: var(--fontSize150);
    }

    ${breakpointSmallHandset} {
      font-size: var(--fontSize125);
    }
  }

  .filter-wrapper {
    flex-grow: 1;
  }

  .create-list {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-grow: 1;
  }
  .onboarding-badge {
    margin-right: 15.5px;
    font-weight: 400;
    font-size: 16px;
    line-height: 33px;
    .new {
      font-weight: 600;
      color: #008078;
    }
    ${breakpointLargeHandset} {
      display: none;
    }
  }

  .list-sort {
    vertical-align: top;

    ${breakpointLargeTablet} {
      margin-top: 0.5rem;
    }

    ${breakpointLargeHandset} {
      margin-top: 0;
      .icon {
        height: 1.5rem;
        width: 1.5rem;
      }
    }

    ${breakpointSmallHandset} {
      margin-top: -0.25rem;
      .icon {
        height: 1.25rem;
        width: 1.25rem;
      }
    }
  }
`

export const SavesHeader = ({
  subset,
  filter,
  title,
  sortOrder,
  handleNewest,
  handleOldest,
  handleCreateList,
  inBulkEdit
}) => {
  const { t } = useTranslation()

  const translatedHeaders = {
    unread: t('headers:saves', 'Saves'),
    archive: t('headers:archive', 'Archive'),
    favorites: t('headers:favorites', 'Favorites'),
    highlights: t('headers:highlights', 'Highlights'),
    articles: t('headers:articles', 'Articles'),
    videos: t('headers:videos', 'Videos'),
    tags: t('headers:tags', 'Tags')
  }

  const showCreateList = !inBulkEdit && subset !== 'tag-page'

  return subset ? (
    <header className={savesHeaderStyle}>
      <h1 className="pageTitle" data-testid="page-title">
        {translatedHeaders[title]}
      </h1>
      <FilterMenu subset={subset} filter={filter} />

      {showCreateList ? (
        <div className="create-list">
          <div className="onboarding-badge">
            <span className="new">{t('list:new', 'New!')}</span>{' '}
            <span>{t('list:add-items-to-a-list', 'Add items to a List')}</span>
          </div>
          <button onClick={handleCreateList} className="tiny">
            <AddIcon className="small" /> {t('list:create-list', 'Create List')}
          </button>
        </div>
      ) : null}

      {subset !== 'tag-page' ? (
        <ListSort sortOrder={sortOrder} handleNewest={handleNewest} handleOldest={handleOldest} />
      ) : null}
    </header>
  ) : null
}
