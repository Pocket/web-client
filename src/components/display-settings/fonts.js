import { PopupMenuGroup, PopupMenuItem, CheckCircledIcon, PremiumIcon } from '@pocket/web-ui'
import { css } from 'linaria'
import classNames from 'classnames'
import { FONT_TYPES } from 'components/fonts/fonts'
import { darkMode } from '@pocket/web-ui'

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

  ${darkMode} img {
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
  blanco: BlancoSVG,
  graphik: GraphikSVG,
  ideal: IdealSansSVG,
  inter: InterSVG,
  plex: PlexSansSVG,
  sentinel: SentinelSVG,
  tiempos: TiemposSVG,
  vollkorn: VollkornSVG,
  whitney: WhitneySVG,
  zilla: ZillaSlabSVG
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
            data-cy={`display-select-font-${font}`}
            className={classNames(fontFamilyButton, { showPremium })}
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
