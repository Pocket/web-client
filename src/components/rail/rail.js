import { css } from 'linaria'
import classNames from 'classnames'

const railWrapper = css`
  position: absolute;
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
    box-shadow: none;
    border-right: 1px solid var(--color-dividerSecondary);
  }
`

export const Rail = ({ visible, clickAction, children }) => (
  <div
    className={classNames(railWrapper, 'rail-wrapper', { visible })}
    onClick={clickAction}>
    { children }
  </div>
)
