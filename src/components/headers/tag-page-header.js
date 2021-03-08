import { css } from 'linaria'
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
import { WithTooltip } from '@pocket/web-ui'
import { buttonReset } from 'components/buttons/button-reset'
import { useTranslation } from 'common/setup/i18n'

import { FeatureFlag } from 'connectors/feature-flags/feature-flags'
import { Button } from '@pocket/web-ui'

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
  a.share {
    margin-left: 1.5rem;
    &:hover {
      color: var(--color-actionPrimaryText);
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
  shareTag,
  isPinned
}) => {
  const { t } = useTranslation()

  return (
    <header className={myListHeaderStyle}>
      <div>
        <h1 className="pageTitle">{capitalizeFirstLetter(title)}</h1>
        <FilterMenu subset={subset} filter={filter} tag={tag} />
        <FeatureFlag flag="temp.web.client.tag.collection.share">
          <Button
            className="share"
            size="small"
            href="/public/configure"
            target="_blank"
            onClick={shareTag}>
            Share
          </Button>
        </FeatureFlag>
      </div>
      <div className="tag-actions">
        <WithTooltip label={t('nav:pin-tag', 'Pin Tag')} delay={true}>
          <button className={buttonReset} onClick={pinTag}>
            {isPinned ? <PinFilledIcon /> : <PinIcon />}
          </button>
        </WithTooltip>
        <WithTooltip label={t('nav:edit-tag', 'Edit Tag')} delay={true}>
          <button className={buttonReset} onClick={editTag}>
            <EditIcon />
          </button>
        </WithTooltip>
        <WithTooltip label={t('nav:delete-tag', 'Delete Tag')} delay={true}>
          <button className={buttonReset} onClick={deleteTag}>
            <DeleteIcon />
          </button>
        </WithTooltip>
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
  shareTag,
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
      shareTag={shareTag}
      isPinned={isPinned}
    />
  ) : null
}
