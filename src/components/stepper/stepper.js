import { css } from 'linaria'
import { tooltipBase } from 'components/tooltip/tooltip'
import classNames from 'classnames'

export const buttonReset = css`
  input:focus,
  button:focus,
  select:focus {
    outline: 0;
  }
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  text-align: inherit;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  &:focus {
    outline: 0;
  }
`

const stepperWrapper = css`
  align-self: start;
  justify-self: start;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, auto);
  width: 100%;
  height: 63px;
  align-items: center;
  justify-content: center;
`
export const StepperWrapper = ({ children, ...args }) => (
  <div className={stepperWrapper} {...args}>{children}</div>
)

const iconWrapper = css`
  span {
    height: 24px;
  }
  &[data-tooltip] {
    cursor: initial;
    padding: 0px 10px 0 0;
  }
`
export const IconWrapper = ({ children, ...args }) => (
  <div className={classNames(iconWrapper, tooltipBase)} {...args}>
    { children }
  </div>
)

const sizeChangeButton = css`
  display: block;
  color: var(--color-textSecondary);
  &:hover {
    cursor: initial;
    background: transparent;
    color: var(--color-textSecondary);
  }
  border-radius: 50%;
  background-color: transparent;
  padding: 8px 10px;
  &.active {
    cursor: pointer;
    color: var(--color-actionSecondary);
    background-color: var(--color-actionSecondaryHoverText);
    &:hover {
      background: var(--color-actionPrimarySubdued);
      color: var(--color-actionPrimaryHover);
    }
  }
  &[data-tooltip] {
    z-index: unset;
  }
`
export const SizeChangeButton = ({ children, active, ...args }) => (
  <button
    className={classNames(buttonReset, sizeChangeButton, tooltipBase, { active })}
    {...args}>
    { children }
  </button>
)
