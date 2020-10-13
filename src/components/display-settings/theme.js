import { PopupMenuGroup } from '@pocket/web-ui'
import { css } from 'linaria'
import { buttonReset } from 'components/buttons/button-reset'
import classNames from 'classnames'
import { ColorModePicker } from '@pocket/web-ui'

const themeWrapper = css`
  padding: 0 var(--spacing150);
`

export const ThemeSettings = ({  }) => {

  return (
    <PopupMenuGroup className={themeWrapper}>
      <ColorModePicker />
    </PopupMenuGroup>
  )
}
