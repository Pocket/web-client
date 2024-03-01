
import { PopupMenuGroup } from 'components/popup-menu/popup-menu'
import { PopupMenuItem } from 'components/popup-menu/popup-menu'
import { CheckCircledIcon } from 'components/icons/CheckCircledIcon'
import { PremiumIcon } from 'components/icons/PremiumIcon'

import { css, cx} from '@emotion/css'
import { FONT_TYPES } from 'components/fonts/fonts'

import BlancoSVG from 'static/images/font-icons/blanco.svg'
import GraphikSVG from 'static/images/font-icons/graphik.svg'
import IdealSansSVG from 'static/images/font-icons/ideal-sans.svg'
import InterSVG from 'static/images/font-icons/inter.svg'
import PlexSansSVG from 'static/images/font-icons/plex-sans.svg'
import SentinelSVG from 'static/images/font-icons/sentinel.svg'
import TiemposSVG from 'static/images/font-icons/tiempos.svg'
import VollkornSVG from 'static/images/font-icons/vollkorn.svg'
import WhitneySVG from 'static/images/font-icons/whitney.svg'
import ZillaSlabSVG from 'static/images/font-icons/zilla-slab.svg'

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

  img {
    height: var(--size150);
  }

  .colormode-dark & img {
    filter: invert(1);
  }

  &:hover img {
    filter: invert(1);
  }

  &.showPremium {
    pointer-events: none;
    opacity: 0.6;
  }
`

const FontImages = {
  blanco: BlancoSVG.src,
  graphik: GraphikSVG.src,
  ideal: IdealSansSVG.src,
  inter: InterSVG.src,
  plex: PlexSansSVG.src,
  sentinel: SentinelSVG.src,
  tiempos: TiemposSVG.src,
  vollkorn: VollkornSVG.src,
  whitney: WhitneySVG.src,
  zilla: ZillaSlabSVG.src
}

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
            data-testid={`display-select-font-${font}`}
            className={cx(fontFamilyButton, showPremium && 'showPremium')}
            icon={showPremium ? <PremiumIcon /> : null}
            onClick={click}
            tabIndex={showPremium ? '-1' : '0'}
            aria-label={FONT_TYPES[font].name}>
            <img src={FontImages[font]} alt="" aria-hidden="true" />

            {isActive ? <CheckCircledIcon /> : null}
          </PopupMenuItem>
        )
      })}
    </PopupMenuGroup>
  )
}
