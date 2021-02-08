import { css } from 'linaria'
import { breakpointSmallHandset } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { breakpointTinyTablet } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'
import { FilterMenu } from 'components/list-filter-menu/list-filter-menu'
import { Trans } from 'common/setup/i18n'
import { Loader } from 'components/loader/loader'

const searchPageHeaderStyle = css`
  margin-bottom: var(--spacing100);
  font-family: 'Graphik Web';

  h1 {
    display: inline-block;
    font-family: 'Graphik Web';
    font-style: normal;
    font-weight: 500;
    font-size: var(--fontSize150);
    line-height: 1.2;
    letter-spacing: -0.005em;
    margin-bottom: var(--spacing150);

    ${breakpointLargeTablet} {
      font-size: var(--fontSize200);
    }

    ${breakpointTinyTablet} {
      margin-bottom: var(--spacing100);
    }

    ${breakpointLargeHandset} {
      font-size: var(--fontSize150);
    }

    ${breakpointSmallHandset} {
      font-size: var(--fontSize125);
      margin-bottom: var(--spacing100);
    }
  }
`

export const SearchPageHeader = ({ filter, total, query }) => {
  const isLoading = total === false
  return query ? (
    <header className={searchPageHeaderStyle}>
      <h1 className="pageTitle">
        <em>"{query}"</em> —{' '}
        {isLoading ? (
          <span>
            Searching <Loader />{' '}
          </span>
        ) : (
          <span>
            {total || 0}{' '}
            <Trans i18nKey="search:search-results">Search Results</Trans>
          </span>
        )}
      </h1>
      <FilterMenu subset="search" query={query} filter={filter} />
    </header>
  ) : null
}
