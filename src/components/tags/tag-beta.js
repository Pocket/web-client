import { css, cx } from 'linaria'

export const betaTag = css`
  padding: 5px;
  font-size: 0.65rem;
  font-weight: 500;
  background-color: var(--color-canvas);
  color: #1eabf9;
  border: 1px solid #1eabf9;
  border-radius: var(--borderRadius);
`

export const BetaTag = ({ children, className, ...args }) => (
  <span className={cx(className, betaTag, 'beta')} {...args}>
    {children}
  </span>
)
