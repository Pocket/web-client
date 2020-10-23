import { css } from 'linaria'
import { buttonReset } from 'components/buttons/button-reset'
import { tagBase } from './tags'
import classNames from 'classnames'

const trendingTag = css`
  background-color: #e8f7f6;
  color: #1cb0a8;
`

export const TrendingTag = ({ children }) => (
  <div className={classNames(buttonReset, tagBase, trendingTag)}>
    {children}
  </div>
)
