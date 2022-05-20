import { css } from 'linaria'
import { FavoriteIcon } from 'components/icons/FavoriteIcon'
import { buttonReset } from 'components/buttons/button-reset'
import { tagBase } from './tags'
import classNames from 'classnames'

const favoriteWrapper = css`
  padding: 0 5px;
  width: 24px;
  justify-content: center;
  background-color: var(--color-amber);
  color: var(--color-canvas);
`
export function FavoriteTag({ margin }) {
  const className = classNames(favoriteWrapper, buttonReset, tagBase)
  return (
    <div className={className} style={{ margin }}>
      <FavoriteIcon />
    </div>
  )
}
