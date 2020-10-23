import { css } from 'linaria'
import { buttonReset } from 'components/buttons/button-reset'
import { tagBase } from './tags'
import classNames from 'classnames'

const bestOfTag = css`
  background-color: #fdecee;
  color: #ef4056;
`

export const BestOfTag = ({ children }) => (
  <div className={classNames(buttonReset, tagBase, bestOfTag)}>{children}</div>
)
