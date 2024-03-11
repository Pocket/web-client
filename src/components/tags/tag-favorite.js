import { css, cx } from '@emotion/css'
import { FavoriteIcon } from '@ui/icons/FavoriteIcon'
import { buttonReset } from 'components/buttons/button-reset'
import { tagBase } from './tags'

const favoriteWrapper = css`
  padding: 0 5px;
  width: 24px;
  justify-content: center;
  background-color: var(--color-amber);
  color: var(--color-canvas);
`
export function FavoriteTag({ margin }) {
  const className = cx(favoriteWrapper, buttonReset, tagBase)
  return (
    <div className={className} style={{ margin }}>
      <FavoriteIcon />
    </div>
  )
}
