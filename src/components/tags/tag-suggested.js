import { css } from 'linaria'
import { tagBase } from './tags'
import classNames from 'classnames'

export const suggestedTag = css`
  cursor: pointer;
  background-color: var(--color-canvas);
  color: #1eabf9;
  border: 1px solid #1eabf9;
  &:hover {
    color: #286f96;
    background-color: var(--color-canvas);
    border: 1px solid #286f96;
  }
`
export const SuggestedTag = ({ children, className, ...args }) => (
  <div className={classNames(className, tagBase, suggestedTag)} {...args}>
    {children}
  </div>
)
