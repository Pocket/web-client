import {
  PopupMenuGroup, PopupMenuItem,
  CheckCircledIcon, ChevronLeftIcon, PremiumIcon
} from '@pocket/web-ui'
import { css } from 'linaria'
import { buttonReset } from 'components/buttons/button-reset'
import classNames from 'classnames'
import { FONT_TYPES } from 'components/fonts/fonts'

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
`

export const FontSettings = ({
  updateFontFamily,
  currentFont,
  isPremium
}) => {
  return (
    <PopupMenuGroup>
      {Object.keys(FONT_TYPES).map(font => {
        const showPremium = FONT_TYPES[font].premium && !isPremium
        const isActive = currentFont === font
        const click = () => updateFontFamily(font)

        return (
          <PopupMenuItem
            key={font}
            className={fontFamilyButton}
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
                <use
                  href={`static/fonts/fonts.symbols-d30c8725.svg#${
                    FONT_TYPES[font].selector
                  }`}
                />
              </svg>
            {isActive ? (
              <CheckCircledIcon />
            ) : null}
          </PopupMenuItem>
        )
      })}
    </PopupMenuGroup>
  )
}
