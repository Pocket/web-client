import { css } from 'linaria'
import classNames from 'classnames'

const railWrapper = css`
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  width: 350px;
  background-color: transparent;
  box-shadow: none;
  border-right: 1px solid transparent;
  transition: all 150ms ease-in-out;
  &:hover,
  &.visible {
    background-color: var(--color-dividerTertiary);
    box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.12);
    border-right: 1px solid var(--color-dividerSecondary);
    transition: all 150ms ease-in-out;
  }
`

export const Rail = ({ visible, clickAction, children }) => (
  <div
    className={classNames(railWrapper, 'rail-wrapper', { visible })}
    onClick={clickAction}>
    { children }
  </div>
)
