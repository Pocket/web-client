import { css, cx } from '@emotion/css'

export const stepperTooltip = css`
  &[data-tooltip] {
    position: relative;
    z-index: unset;
    cursor: pointer;
  }
  &[data-tooltip]:before,
  &[data-tooltip]:after {
    position: absolute;
    pointer-events: none;
    left: 50%;
    visibility: hidden;
    opacity: 0;
    transform: translate(-50%, 14px);
    transform-style: preserve-3d;
    transition:
      transform 200ms 1200ms ease-in-out,
      opacity 150ms 1250ms ease-out;
    z-index: 19;
  }
  &[data-tooltip]:before {
    white-space: nowrap;
    bottom: 0;
    padding: 5px 10px 6px;
    border-radius: 4px;
    background-color: #000;
    color: #fff;
    content: attr(data-tooltip);
    text-align: center;
    font-size: 14px;
    line-height: 1.2;
  }
  &[data-tooltip]:after {
    bottom: 27px;
    width: 0;
    border-bottom: 5px solid #000;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: ' ';
    font-size: 0;
    line-height: 0;
  }
  &[data-tooltip]:hover:before,
  &[data-tooltip]:hover:after {
    transform: translate(-50%, 36px);
    visibility: visible;
    opacity: 1;
  }
  @media (hover: none), (hover: on-demand) {
    &[data-tooltip]:hover:before,
    &[data-tooltip]:hover:after {
      /* suppress hover effect on devices that don't support hover fully */
      transform: translate(-50%, 14px);
      visibility: hidden;
      opacity: 0;
      display: none;
    }
  }
`

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
  <div className={cx(iconWrapper, stepperTooltip)} {...args}>
    {children}
  </div>
)

const stepperButton = css`
  display: block;
  color: var(--color-textTertiary);
  z-index: 1;

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
`
export const StepperButton = ({ children, active, ...args }) => (
  <button className={cx(stepperButton, stepperTooltip, active && 'active')} {...args}>
    {children}
  </button>
)
