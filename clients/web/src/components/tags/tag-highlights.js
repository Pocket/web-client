import { css, cx } from '@emotion/css'
import { HighlightIcon } from '@ui/icons/HighlightIcon'
import { buttonReset } from 'components/buttons/button-reset'
import { tagBase } from './tags'

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
  const className = cx(highlightWrapper, buttonReset, tagBase)
  return (
    <div className={className} style={{ margin }}>
      <HighlightIcon />
      <span>{count}</span>
    </div>
  )
}
