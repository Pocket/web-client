import { css, cx } from 'linaria'
import { breakpointSmallHandset } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { breakpointTinyTablet } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'
import { FilterMenu } from 'components/list-filter-menu/list-filter-menu'
import { capitalizeFirstLetter } from 'common/utilities'
import { PinFilledIcon } from '@pocket/web-ui'
import { PinIcon } from '@pocket/web-ui'
import { EditIcon } from '@pocket/web-ui'
import { DeleteIcon } from '@pocket/web-ui'
import { buttonReset } from 'components/buttons/button-reset'
import { bottomTooltipDelayed } from 'components/tooltip/tooltip'
import { useTranslation } from 'next-i18next'

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

export const UnTaggedHeader = ({ subset, filter, tag }) => (
  <header className={myListHeaderStyle}>
    <div>
      <h1 className="pageTitle">not tagged</h1>
      <FilterMenu subset={subset} filter={filter} tag={tag} />
    </div>
  </header>
)

export const TaggedHeader = ({
  subset,
  filter,
  title,
  tag,
  pinTag,
  editTag,
  deleteTag,
  isPinned
}) => {
  const { t } = useTranslation()

  return (
    <header className={myListHeaderStyle}>
      <div>
        <h1 className="pageTitle">{capitalizeFirstLetter(title)}</h1>
        <FilterMenu subset={subset} filter={filter} tag={tag} />
      </div>
      <div className="tag-actions">
        <button
          aria-label={t('nav:pin-tag', 'Pin Tag')}
          data-tooltip={t('nav:pin-tag', 'Pin Tag')}
          className={cx(buttonReset, bottomTooltipDelayed)}
          onClick={pinTag}>
          {isPinned ? <PinFilledIcon /> : <PinIcon />}
        </button>

        <button
          aria-label={t('nav:edit-tag', 'Edit Tag')}
          data-tooltip={t('nav:edit-tag', 'Edit Tag')}
          className={cx(buttonReset, bottomTooltipDelayed)}
          onClick={editTag}>
          <EditIcon />
        </button>

        <button
          aria-label={t('nav:delete-tag', 'Delete Tag')}
          data-tooltip={t('nav:delete-tag', 'Delete Tag')}
          className={cx(buttonReset, bottomTooltipDelayed)}
          onClick={deleteTag}>
          <DeleteIcon />
        </button>
      </div>
    </header>
  )
}

export const TagPageHeader = ({
  subset,
  filter,
  title,
  tag,
  pinTag,
  editTag,
  deleteTag,
  isPinned
}) => {
  const TagHeader = '_untagged_'.includes(title) ? UnTaggedHeader : TaggedHeader

  return subset ? (
    <TagHeader
      subset={subset}
      filter={filter}
      title={title}
      tag={tag}
      pinTag={pinTag}
      editTag={editTag}
      deleteTag={deleteTag}
      isPinned={isPinned}
    />
  ) : null
}
