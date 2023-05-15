import { css, cx } from '@emotion/css'
import { buttonReset } from 'components/buttons/button-reset'
import { tagBase } from './tags'

const trendingTag = css`
  background-color: #e8f7f6;
  color: #1cb0a8;
`

export const TrendingTag = ({ children }) => (
  <div className={cx(buttonReset, tagBase, trendingTag)}>{children}</div>
)
