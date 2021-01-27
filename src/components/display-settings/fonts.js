import {
  PopupMenuGroup,
  PopupMenuItem,
  CheckCircledIcon,
  ChevronLeftIcon,
  PremiumIcon
} from '@pocket/web-ui'
import { css } from 'linaria'
import { buttonReset } from 'components/buttons/button-reset'
import classNames from 'classnames'
import { FONT_TYPES } from 'components/fonts/fonts'
import FontSVG from 'static/images/fonts.symbols-d30c8725.svg'

const fontFamilyButton = css`
  height: 50px;

  .label {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .icon {
      margin-right: 0;
    }
  }

  &.showPremium {
    pointer-events: none;
    opacity: 0.6;
  }
`

export const FontSettings = ({ updateFontFamily, currentFont, isPremium }) => {
  return (
    <PopupMenuGroup>
      {Object.keys(FONT_TYPES).map((font) => {
        const showPremium = FONT_TYPES[font].premium && !isPremium
        const isActive = currentFont === font
        const click = () => updateFontFamily(font)

        return (
          <PopupMenuItem
            key={font}
            className={classNames(fontFamilyButton, { showPremium })}
            icon={showPremium ? <PremiumIcon /> : null}
            onClick={click}
            aria-label={FONT_TYPES[font].name}>
            <svg
              style={{
                display: 'inline-block',
                position: 'relative',
                fill: 'currentColor',
                height: '24px',
                width: '120px'
              }}>
              <use href={`${FontSVG}#${FONT_TYPES[font].selector}`} />
            </svg>
            {isActive ? <CheckCircledIcon /> : null}
          </PopupMenuItem>
        )
      })}
    </PopupMenuGroup>
  )
}
