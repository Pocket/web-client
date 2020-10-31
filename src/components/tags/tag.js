import React from 'react'
import { css } from 'linaria'
import classNames from 'classnames'
import { buttonReset } from 'components/buttons/button-reset'
import { CrossIcon } from '@pocket/web-ui'

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

const tagWrapper = css`
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
`

export class Tag extends React.Component {
  constructor(props) {
    super(props)

    this.removeClick = () => {
      const { removeClick, children } = props
      if (removeClick) removeClick(children)
    }

    this.selectClick = () => {
      const { selectClick, children } = props
      if (selectClick) selectClick(children)
    }
  }

  render() {
    const { children, removeClick, selected, action, margin } = this.props
    return (
      <div
        className={classNames(tagBase, tagWrapper, { action, selected })}
        style={{ margin }}
        onClick={this.selectClick}>
        {children}
        {removeClick ? (
          <button
            className={classNames(buttonReset, closeWrapper, { selected })}
            onClick={this.removeClick}>
            <CrossIcon />
          </button>
        ) : null}
      </div>
    )
  }
}
