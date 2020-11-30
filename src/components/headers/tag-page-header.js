import { css } from 'linaria'
import { breakpointSmallHandset } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { breakpointTinyTablet } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'
import { FilterMenu } from 'components/list-filter-menu/list-filter-menu'
import { capitalizeFirstLetter } from 'common/utilities'
import { BookmarkFilledIcon } from '@pocket/web-ui'
import { BookmarkIcon } from '@pocket/web-ui'
import { EditIcon } from '@pocket/web-ui'
import { WithTooltip } from '@pocket/web-ui'
import { buttonReset } from 'components/buttons/button-reset'

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
    margin-bottom: 0;

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

  .tag-actions {
    display: inline-block;
    margin-bottom: var(--spacing050);
  }
  .icon {
    margin-right: var(--size050);
  }
  button {
    font-size: 16px;
    color: var(--color-textTertiary);
    &:hover {
      color: var(--color-textLinkHover);
    }
  }
`

export const TagPageHeader = ({
  subset,
  filter,
  title,
  tag,
  pinTag,
  editTag,
  isPinned
}) => {
  return subset ? (
    <header className={myListHeaderStyle}>
      <div>
        <h1 className="pageTitle">{capitalizeFirstLetter(title)}</h1>
        <FilterMenu subset={subset} filter={filter} tag={tag} />
      </div>
      <div className="tag-actions">
        <WithTooltip label="Pin Tag" delay={true}>
          <button className={buttonReset} onClick={pinTag}>
            {isPinned ? <BookmarkFilledIcon /> : <BookmarkIcon />}
          </button>
        </WithTooltip>
        <WithTooltip label="Edit Tag" delay={true}>
          <button className={buttonReset} onClick={editTag}>
            <EditIcon />
          </button>
        </WithTooltip>
      </div>
    </header>
  ) : null
}
