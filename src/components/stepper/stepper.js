import { css } from 'linaria'
import { tooltipBase } from 'components/tooltip/tooltip'
import classNames from 'classnames'
import { buttonReset } from 'components/buttons/button-reset'

const stepperWrapper = css`
  align-self: start;
  justify-self: start;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, auto);
  width: 100%;
  height: var(--size300);
  align-items: center;
  justify-content: center;
  padding: 0 var(--spacing150);
`
export const StepperWrapper = ({ children, ...args }) => (
  <div className={stepperWrapper} {...args}>
    {children}
  </div>
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
    {children}
  </div>
)

const stepperButton = css`
  display: block;
  color: var(--color-textTertiary);
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
    color: var(--color-textSecondary);
    background-color: var(--color-popoverBorder);
    &:hover {
      background: var(--color-actionPrimarySubdued);
      color: var(--color-actionPrimaryHover);
    }
  }
  &[data-tooltip] {
    z-index: unset;
  }
`
export const StepperButton = ({ children, active, ...args }) => (
  <button
    className={classNames(buttonReset, stepperButton, tooltipBase, { active })}
    {...args}>
    {children}
  </button>
)
