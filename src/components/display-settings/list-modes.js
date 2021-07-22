import { css, cx } from 'linaria'

import { PopupMenuGroup } from '@pocket/web-ui'
import { GridViewIcon } from '@pocket/web-ui'
import { ListViewIcon } from '@pocket/web-ui'
import { DetailViewIcon } from '@pocket/web-ui'
import { buttonReset } from 'components/buttons/button-reset'

import { bottomTooltip } from 'components/tooltip/tooltip'

import { useTranslation } from 'next-i18next'

const listSettingStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    padding: var(--size050);
  }
  .backing {
    padding: 0.5rem 1rem;
    border-radius: var(--borderRadius);
    border: 2px solid var(--color-canvas);
    &:hover {
      color: var(--color-textLinkHover);
    }
  }
  .icon {
    cursor: pointer;
  }
  .active .backing {
    border-color: var(--color-formFieldFocusLabel);
    color: var(--color-formFieldFocusLabel);
    &:hover {
      color: var(--color-formFieldFocusLabel);
    }
  }
  button:focus {
    transition: none;
    color: var(--color-navCurrentTabText);
    outline: 1px auto var(--color-navCurrentTab);
  }
`

export const ListSettings = ({ listMode = 'grid', setListMode, setGridMode, setDetailMode }) => {
  const { t } = useTranslation()

  const isActive = (current) => current === listMode

  return (
    <PopupMenuGroup>
      <div className={listSettingStyle}>
        <div className={cx(isActive('list') && 'active')} onClick={setListMode}>
          <button
            aria-label={t('settings:display-items-as-a-list', 'Display items as a list')}
            data-tooltip={t('settings:display-items-as-a-list', 'Display items as a list')}
            data-cy="display-list"
            className={cx(buttonReset, bottomTooltip, 'backing')}>
            <ListViewIcon />
          </button>
        </div>
        <div className={cx(isActive('detail') && 'active')} onClick={setDetailMode}>
          <button
            aria-label={t('settings:display-items-in-detail', 'Display items in detail')}
            data-tooltip={t('settings:display-items-in-detail', 'Display items in detail')}
            data-cy="display-detail"
            className={cx(buttonReset, bottomTooltip, 'backing')}>
            <DetailViewIcon />
          </button>
        </div>
        <div className={cx(isActive('grid') && 'active')} onClick={setGridMode}>
          <button
            aria-label={t('settings:display-items-as-a-grid', 'Display items as a grid')}
            data-tooltip={t('settings:display-items-as-a-grid', 'Display items as a grid')}
            data-cy="display-grid"
            className={cx(buttonReset, bottomTooltip, 'backing')}>
            <GridViewIcon />
          </button>
        </div>
      </div>
    </PopupMenuGroup>
  )
}
