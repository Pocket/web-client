import { css, cx } from 'linaria'
import { SortByNewestIcon } from '@pocket/web-ui'
import { SortByOldestIcon } from '@pocket/web-ui'
import { buttonReset } from 'components/buttons/button-reset'
import { bottomTooltip } from 'components/tooltip/tooltip'
import { useTranslation } from 'next-i18next'

const sortStyles = css`
  display: inline-block;
  margin-left: 0.75rem;

  button {
    padding: 0.25rem 0.5rem;
    border-radius: var(--borderRadius);
    border: 2px solid var(--color-canvas);
    &:hover {
      color: var(--color-textLinkHover);
    }
  }

  .icon {
    height: 1.5rem;
    width: 1.5rem;
  }
`

export const ListSort = ({ sortOrder = 'newest', toggleSortOrder }) => {
  const { t } = useTranslation()

  return (
    <div className={cx(sortStyles, 'list-sort')} onClick={toggleSortOrder}>
      {sortOrder === 'newest' ? (
        <button
          aria-label={t(
            'settings:sort-items-by-oldest-first',
            'Sort items by oldest first'
          )}
          data-tooltip={t(
            'settings:sort-items-by-oldest-first',
            'Sort items by oldest first'
          )}
          data-cy="sort-oldest"
          className={cx(buttonReset, bottomTooltip)}>
          <SortByOldestIcon />
        </button>
      ) : (
        <button
          aria-label={t(
            'settings:sort-items-by-newest-first',
            'Sort items by newest first'
          )}
          data-tooltip={t(
            'settings:sort-items-by-newest-first',
            'Sort items by newest first'
          )}
          data-cy="sort-newest"
          className={cx(buttonReset, bottomTooltip)}>
          <SortByNewestIcon />
        </button>
      )}
    </div>
  )
}
