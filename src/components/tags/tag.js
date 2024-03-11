import React from 'react'
import { css, cx } from '@emotion/css'
import { buttonReset } from 'components/buttons/button-reset'
import { CrossIcon } from '@ui/icons/CrossIcon'

export const tagBase = css`
  font-family: 'Graphik Web';
  border-radius: 4px;
  display: inline-flex;
  align-content: center;
  align-items: center;
  line-height: 24px;
  height: 24px;
  padding: 0 0.5em;
  position: relative;
  white-space: nowrap;
  font-weight: 400;
  font-size: 16px;
  user-select: none;
  .icon {
    margin-top: 0;
  }
`

export const tagWrapper = css`
  text-transform: lowercase;
  max-width: 100%;
  overflow: hidden;
  vertical-align: bottom;
  cursor: initial;
  background-color: var(--color-dividerTertiary);
  color: var(--color-textPrimary);
  &:hover {
    color: var(--color-textPrimary);
    background-color: var(--color-dividerTertiary);
  }
  &.selected {
    background-color: var(--color-actionPrimary);
    color: var(--color-actionPrimaryText);
    &:hover {
      color: var(--color-actionPrimaryText);
      background-color: var(--color-actionPrimaryHover);
    }
  }
  &.action {
    cursor: pointer;
  }
`

const closeWrapper = css`
  cursor: pointer;
  margin-left: 8px;
  line-height: 0;
  height: 100%;
  &:hover {
    color: var(--color-textPrimary);
    background-color: transparent;
  }
  &.selected:hover {
    color: var(--color-actionPrimaryText);
  }

  .icon {
    height: 1em;
  }
`

export function Tag({ removeClick, selectClick, children, selected, margin }) {
  const onRemoveClick = (e) => {
    e.stopPropagation()
    if (removeClick) removeClick(children)
  }

  const onSelectClick = () => (selectClick ? selectClick(children) : null)

  const action = selectClick ? true : false
  const tagClass = cx(tagBase, tagWrapper, action && 'action', selected && 'selected')
  const removeClass = cx(buttonReset, closeWrapper, selected && 'selected')

  return (
    <div className={tagClass} style={{ margin }} onClick={onSelectClick}>
      {children}
      {removeClick ? (
        <button className={removeClass} onClick={onRemoveClick}>
          <CrossIcon />
        </button>
      ) : null}
    </div>
  )
}
