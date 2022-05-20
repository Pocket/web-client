import { css } from 'linaria'
import { DiscoverFilledIcon } from 'components/icons/DiscoverFilledIcon'
import { buttonReset } from 'components/buttons/button-reset'
import { tagBase } from './tags'
import classNames from 'classnames'

const webOnlyWrapper = css`
  padding: 0 5px;
  width: 24px;
  justify-content: center;
  background-color: #1eabf9;
  color: var(--color-canvas);
`
export function WebOnlyTag({ count, margin }) {
  const className = classNames(webOnlyWrapper, buttonReset, tagBase)
  return (
    <div className={className} style={{ margin }}>
      <DiscoverFilledIcon />
      <span>{count}</span>
    </div>
  )
}
