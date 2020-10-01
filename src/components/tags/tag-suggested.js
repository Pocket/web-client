import { css } from 'linaria'
import { tagBase } from './tags'
import classNames from 'classnames'

export const suggestedTag = css`
  cursor: pointer;
  background-color: var(--color-canvas);
  color: #1EABF9;
  border: 1px solid #1EABF9;
  &:hover {
    color: #286F96;
    background-color: var(--color-canvas);
    border: 1px solid #286F96;
  }
`
export const SuggestedTag = ({ children, ...args }) => (
  <div className={classNames(tagBase, suggestedTag)} {...args}>
    { children }
  </div>
)
