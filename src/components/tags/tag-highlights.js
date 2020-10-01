import { css } from 'linaria'
import { HighlightIcon } from '@pocket/web-ui'
import { buttonReset } from 'components/buttons/button-reset'
import { tagBase } from './tags'
import classNames from 'classnames'

const highlightWrapper = css`
  background-color: #FFF8EC;
  svg {
    color: #FFC25E;
    padding-right: 4px;
  }
  span {
    color: #976D28;
  }
`
export function HighlightsTag({ count, margin }) {
  const className = classNames(highlightWrapper, buttonReset, tagBase)
  return (
    <div className={className} style={{ margin }}>
      <HighlightIcon />
      <span>{count}</span>
    </div>
  )
}
