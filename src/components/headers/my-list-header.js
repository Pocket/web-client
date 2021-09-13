import { css } from 'linaria'
import { useTranslation } from 'next-i18next'
import { breakpointSmallHandset } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'
import { FilterMenu } from 'components/list-filter-menu/list-filter-menu'
import { ListSort } from 'components/list-sort/list-sort'

export const myListHeaderStyle = css`
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

export const MyListHeader = ({ subset, filter, title, sortOrder }) => {
  const { t } = useTranslation()

  const translatedHeaders = {
    unread: t('headers:my-list', 'My List'),
    archive: t('headers:archive', 'Archive'),
    favorites: t('headers:favorites', 'Favorites'),
    highlights: t('headers:highlights', 'Highlights'),
    articles: t('headers:articles', 'Articles'),
    videos: t('headers:videos', 'Videos'),
    tags: t('headers:tags', 'Tags')
  }

  return subset ? (
    <header className={myListHeaderStyle}>
      <h1 className="pageTitle" data-cy="page-title">{translatedHeaders[title]}</h1>
      <FilterMenu subset={subset} filter={filter} />
      { subset !== 'tag-page' ? (
        <ListSort sortOrder={sortOrder} />
      ) : null}
    </header>
  ) : null
}
