import { css } from 'linaria'
import { breakpointSmallHandset } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { breakpointTinyTablet } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'
import { FilterMenu } from 'components/list-filter-menu/list-filter-menu'
import { capitalizeFirstLetter } from 'common/utilities'

const myListHeaderStyle = css`
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

export const TagPageHeader = ({ subset, filter, title, tag }) => {
  return subset ? (
    <header className={myListHeaderStyle}>
      <h1 className="pageTitle">Tag: {capitalizeFirstLetter(title)}</h1>
      <FilterMenu subset={subset} filter={filter} tag={tag} />
    </header>
  ) : null
}
