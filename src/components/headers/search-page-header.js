import { css, cx } from '@emotion/css'
import { breakpointLargeTablet } from 'common/constants'
import { FilterMenu } from 'components/list-filter-menu/list-filter-menu'
import { useTranslation } from 'next-i18next'
import { Loader } from 'components/loader/loader'
import { ListSort } from 'components/list-sort/list-sort'
import { savesHeaderStyle } from './saves-header'

const searchStyles = css`
  ${breakpointLargeTablet} {
    flex-wrap: wrap;

    .filter-wrapper {
      margin-bottom: 1rem;
      padding-left: 0;
      order: 3;
      width: 100%;
    }
  }
`

export const SearchPageHeader = ({
  filter,
  total,
  query,
  sortOrder,
  isPremium,
  handleNewest,
  handleOldest,
  handleRelevance
}) => {
  const { t } = useTranslation()

  const isLoading = total === false
  return query ? (
    <header className={cx(savesHeaderStyle, searchStyles)}>
      <h1 className="pageTitle" data-cy="page-title">
        <em data-cy="search-query">“{query}”</em> —{' '}
        {isLoading ? (
          <span>
            {t('search:searching', 'Searching')} <Loader />{' '}
          </span>
        ) : (
          <span>
            {total || 0} {t('search:search-results', 'Search Results')}
          </span>
        )}
      </h1>
      <ListSort
        sortOrder={sortOrder}
        // showRelevance={isPremium} // this is currently broken 1/4/24
        handleNewest={handleNewest}
        handleOldest={handleOldest}
        handleRelevance={handleRelevance}
      />
    </header>
  ) : null
}
