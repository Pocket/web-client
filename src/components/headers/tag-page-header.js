import { css, cx } from '@emotion/css'
import { FilterMenu } from 'components/list-filter-menu/list-filter-menu'
import { capitalizeFirstLetter } from 'common/utilities/strings/strings'
import { PinFilledIcon } from 'components/icons/PinFilledIcon'
import { PinIcon } from 'components/icons/PinIcon'
import { EditIcon } from 'components/icons/EditIcon'
import { DeleteIcon } from 'components/icons/DeleteIcon'
import { buttonReset } from 'components/buttons/button-reset'
import { bottomTooltipDelayed } from 'components/tooltip/tooltip'
import { useTranslation } from 'next-i18next'
import { savesHeaderStyle } from './saves-header'
import { ListSort } from 'components/list-sort/list-sort'

const tagPageHeaderStyle = css`
  header {
    border-bottom: 0;
    margin-bottom: 0;
  }

  h1 {
    margin-bottom: 0;
  }

  .tag-actions {
    width: 100%;
    display: inline-block;
    padding-bottom: var(--spacing050);
    border-bottom: 1px solid var(--color-dividerTertiary);

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
  }
`

export const UnTaggedHeader = ({ subset, filter, tag, sortOrder, handleNewest, handleOldest }) => (
  <header className={savesHeaderStyle}>
    <h1 className="pageTitle">not tagged</h1>
    <FilterMenu subset={subset} filter={filter} tag={tag} />
    <ListSort sortOrder={sortOrder} handleNewest={handleNewest} handleOldest={handleOldest} />
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
  isPinned,
  sortOrder,
  handleNewest,
  handleOldest
}) => {
  const { t } = useTranslation()

  return (
    <div className={tagPageHeaderStyle}>
      <header className={savesHeaderStyle}>
        <h1 className="pageTitle" data-testid="page-title">
          {capitalizeFirstLetter(title)}
        </h1>
        <FilterMenu subset={subset} filter={filter} tag={tag} />
        <ListSort sortOrder={sortOrder} handleNewest={handleNewest} handleOldest={handleOldest} />
      </header>
      <div className="tag-actions">
        <button
          aria-label={isPinned ? t('nav:unpin-tag', 'Unpin Tag') : t('nav:pin-tag', 'Pin Tag')}
          data-tooltip={isPinned ? t('nav:unpin-tag', 'Unpin Tag') : t('nav:pin-tag', 'Pin Tag')}
          data-testid={isPinned ? 'tag-unpin' : 'tag-pin'}
          className={cx(buttonReset, bottomTooltipDelayed)}
          onClick={pinTag}>
          {isPinned ? <PinFilledIcon /> : <PinIcon />}
        </button>

        <button
          aria-label={t('nav:edit-tag', 'Edit Tag')}
          data-tooltip={t('nav:edit-tag', 'Edit Tag')}
          data-testid="tag-edit"
          className={cx(buttonReset, bottomTooltipDelayed)}
          onClick={editTag}>
          <EditIcon />
        </button>

        <button
          aria-label={t('nav:delete-tag', 'Delete Tag')}
          data-tooltip={t('nav:delete-tag', 'Delete Tag')}
          data-testid="tag-delete"
          className={cx(buttonReset, bottomTooltipDelayed)}
          onClick={deleteTag}>
          <DeleteIcon />
        </button>
      </div>
    </div>
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
  isPinned,
  sortOrder,
  handleNewest,
  handleOldest
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
      sortOrder={sortOrder}
      handleNewest={handleNewest}
      handleOldest={handleOldest}
    />
  ) : null
}
