import { css } from 'linaria'
import { HighlightIcon } from 'components/icons/HighlightIcon'
import { buttonReset } from 'components/buttons/button-reset'
import { tagBase } from './tags'
import classNames from 'classnames'

const highlightWrapper = css`
  background-color: #fff8ec;
  svg {
    color: #ffc25e;
    padding-right: 4px;
  }
  span {
    color: #976d28;
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
