import { css } from 'linaria'
import classNames from 'classnames'
import { tooltipBase } from './tooltip'

export default {
  title: 'Components/Tooltip'
}

const tooltipExample = css`
  margin: 50px;
  display: inline-block;
`

export const normal = () => (
  <div
    className={classNames(tooltipExample, tooltipBase)}
    data-tooltip={'Hello!'}>
    Hover me
  </div>
)
