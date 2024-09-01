import { css, cx } from '@emotion/css'
import { breakpointLargeTablet } from 'common/constants'
import { useTranslation } from 'next-i18next'
import { Loader } from 'components/loader/loader'
import { savesHeaderStyle } from './saves-header'

const searchStyles = css`
  .query {
    text-transform: capitalize;
  }
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

export const SearchDiscoveryPageHeader = ({ total, loading, query }) => {
  const { t } = useTranslation()

  return query ? (
    <header className={cx(savesHeaderStyle, searchStyles)}>
      <h1 className="pageTitle" data-testid="page-title">
        <em data-testid="search-query" className="query">
          “{query}” —
        </em>{' '}
        {loading ? (
          <span>
            {t('search:searching', 'Searching')} <Loader />{' '}
          </span>
        ) : (
          <span>
            {total || 0} {t('search:results', 'results')}
          </span>
        )}
      </h1>
    </header>
  ) : null
}
