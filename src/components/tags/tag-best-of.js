import { css, cx } from '@emotion/css'
import { buttonReset } from 'components/buttons/button-reset'
import { tagBase } from './tags'

const bestOfTag = css`
  background-color: #fdecee;
  color: #ef4056;
`

export const BestOfTag = ({ children }) => (
  <div className={cx(buttonReset, tagBase, bestOfTag)}>{children}</div>
)
