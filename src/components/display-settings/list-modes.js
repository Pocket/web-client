import React, { useState, useEffect } from 'react'
import { css } from 'linaria'

import { PopupMenuGroup } from '@pocket/web-ui'
import { GridViewIcon } from '@pocket/web-ui'
import { ListViewIcon } from '@pocket/web-ui'
import { SortByNewestIcon } from '@pocket/web-ui'
import { SortByOldestIcon } from '@pocket/web-ui'
import { WithTooltip } from '@pocket/web-ui'

const listSettingStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    padding: var(--size050);
    &:last-of-type {
      border-left: var(--dividerStyle);
    }
  }
  .icon {
    cursor: pointer;
    &:hover {
      color: var(--color-textLinkHover);
    }
  }
`

export const ListSettings = ({
  listMode = 'grid',
  sortOrder = 'newest',
  toggleSortOrder,
  toggleListMode
}) => {
  return (
    <PopupMenuGroup>
      <div className={listSettingStyle}>
        <div onClick={toggleSortOrder}>
          {sortOrder === 'newest' ? (
            <WithTooltip label="Sort items by oldest first">
              <SortByOldestIcon />
            </WithTooltip>
          ) : (
            <WithTooltip label="Sort items by newest first">
              <SortByNewestIcon />
            </WithTooltip>
          )}
        </div>
        <div onClick={toggleListMode}>
          {listMode === 'grid' ? (
            <WithTooltip label="Display items as a list">
              <ListViewIcon />
            </WithTooltip>
          ) : (
            <WithTooltip label="Display items as a grid">
              <GridViewIcon />
            </WithTooltip>
          )}
        </div>
      </div>
    </PopupMenuGroup>
  )
}
