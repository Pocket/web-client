import { css, cx } from '@emotion/css'
import { DiscoverFilledIcon } from '@ui/icons/DiscoverFilledIcon'
import { buttonReset } from 'components/buttons/button-reset'
import { tagBase } from './tags'

const webOnlyWrapper = css`
  padding: 0 5px;
  width: 24px;
  justify-content: center;
  background-color: #1eabf9;
  color: var(--color-canvas);
`
export function WebOnlyTag({ count, margin }) {
  const className = cx(webOnlyWrapper, buttonReset, tagBase)
  return (
    <div className={className} style={{ margin }}>
      <DiscoverFilledIcon />
      <span>{count}</span>
    </div>
  )
}
