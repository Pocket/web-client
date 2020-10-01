import { css } from 'linaria'
import { buttonReset } from 'components/buttons/button-reset'
import { tagBase } from './tags'
import classNames from 'classnames'

const trendingTag = css`
  background-color: #E8F7F6;
  color: #1CB0A8;
`

export const TrendingTag = ({ children }) => (
  <div className={classNames(buttonReset, tagBase, trendingTag)}>
    { children }
  </div>
)
