import { css } from 'linaria'

import IdealSansWoff from 'static/fonts/ideal-sans/IdealSansSSm-Book_Web.woff'
import IdealSansWoff2 from 'static/fonts/ideal-sans/IdealSansSSm-Book_Web.woff2'
import IdealSansItalicWoff from 'static/fonts/ideal-sans/IdealSansSSm-BookItalic_Web.woff'
import IdealSansItalicWoff2 from 'static/fonts/ideal-sans/IdealSansSSm-BookItalic_Web.woff2'
import IdealSansBoldWoff from 'static/fonts/ideal-sans/IdealSansSSm-Semibold_Web.woff'
import IdealSansBoldWoff2 from 'static/fonts/ideal-sans/IdealSansSSm-Semibold_Web.woff2'
import IdealSansBoldItalicWoff from 'static/fonts/ideal-sans/IdealSansSSm-SemiboldItalic_Web.woff'
import IdealSansBoldItalicWoff2 from 'static/fonts/ideal-sans/IdealSansSSm-SemiboldItalic_Web.woff2'

import InterRegularWoff from 'static/fonts/inter/Inter-Regular.woff'
import InterRegularWoff2 from 'static/fonts/inter/Inter-Regular.woff2'
import InterItalicWoff from 'static/fonts/inter/Inter-Italic.woff'
import InterItalicWoff2 from 'static/fonts/inter/Inter-Italic.woff2'
import InterBoldWoff from 'static/fonts/inter/Inter-Bold.woff'
import InterBoldWoff2 from 'static/fonts/inter/Inter-Bold.woff2'
import InterBoldItalicWoff from 'static/fonts/inter/Inter-BoldItalic.woff'
import InterBoldItalicWoff2 from 'static/fonts/inter/Inter-BoldItalic.woff2'

import SentinelRegularWoff from 'static/fonts/sentinel/Sentinel-Book_Web.woff'
import SentinelRegularWoff2 from 'static/fonts/sentinel/Sentinel-Book_Web.woff2'
import SentinelItalicWoff from 'static/fonts/sentinel/Sentinel-BookItalic_Web.woff'
import SentinelItalicWoff2 from 'static/fonts/sentinel/Sentinel-BookItalic_Web.woff2'
import SentinelBoldWoff from 'static/fonts/sentinel/Sentinel-Semibold_Web.woff'
import SentinelBoldWoff2 from 'static/fonts/sentinel/Sentinel-Semibold_Web.woff2'
import SentinelBoldItalicWoff from 'static/fonts/sentinel/Sentinel-SemiboldItalic_Web.woff'
import SentinelBoldItalicWoff2 from 'static/fonts/sentinel/Sentinel-SemiboldItalic_Web.woff2'

import TiemposRegularWoff from 'static/fonts/tiempos/TiemposTextWeb-Regular.woff'
import TiemposRegularWoff2 from 'static/fonts/tiempos/TiemposTextWeb-Regular.woff2'
import TiemposItalicWoff from 'static/fonts/tiempos/TiemposTextWeb-RegularItalic.woff'
import TiemposItalicWoff2 from 'static/fonts/tiempos/TiemposTextWeb-RegularItalic.woff2'
import TiemposBoldWoff from 'static/fonts/tiempos/TiemposTextWeb-Semibold.woff'
import TiemposBoldWoff2 from 'static/fonts/tiempos/TiemposTextWeb-Semibold.woff2'
import TiemposBoldItalicWoff from 'static/fonts/tiempos/TiemposTextWeb-SemiboldItalic.woff'
import TiemposBoldItalicWoff2 from 'static/fonts/tiempos/TiemposTextWeb-SemiboldItalic.woff2'

import WhitneyRegularWoff from 'static/fonts/whitney/Whitney-Book_Web.woff'
import WhitneyRegularWoff2 from 'static/fonts/whitney/Whitney-Book_Web.woff2'
import WhitneyItalicWoff from 'static/fonts/whitney/Whitney-BookItal_Web.woff'
import WhitneyItalicWoff2 from 'static/fonts/whitney/Whitney-BookItal_Web.woff2'
import WhitneyBoldWoff from 'static/fonts/whitney/Whitney-Semibld_Web.woff'
import WhitneyBoldWoff2 from 'static/fonts/whitney/Whitney-Semibld_Web.woff2'
import WhitneyBoldItalicWoff from 'static/fonts/whitney/Whitney-SemibldItal_Web.woff'
import WhitneyBoldItalicWoff2 from 'static/fonts/whitney/Whitney-SemibldItal_Web.woff2'

export const Fonts = css`
  :global() {
    @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,400i,600,600i');
    @import url('https://fonts.googleapis.com/css?family=Vollkorn:400,400i,700,700i');
    @import url('https://fonts.googleapis.com/css?family=Zilla+Slab:400,400i,600,600i');

    @font-face {
      font-family: 'IdealSans';
      src: url(${IdealSansWoff}), url(${IdealSansWoff2});
    }

    @font-face {
      font-family: 'IdealSans';
      font-weight: bold;
      src: url(${IdealSansBoldWoff}), url(${IdealSansBoldWoff2});
    }

    @font-face {
      font-family: 'IdealSans';
      font-style: italic;
      src: url(${IdealSansItalicWoff}), url(${IdealSansItalicWoff2});
    }

    @font-face {
      font-family: 'IdealSans';
      font-style: italic;
      font-weight: bold;
      src: url(${IdealSansBoldItalicWoff}), url(${IdealSansBoldItalicWoff});
    }

    @font-face {
      font-family: 'Inter';
      src: url(${InterRegularWoff}), url(${InterRegularWoff2});
    }

    @font-face {
      font-family: 'Inter';
      font-weight: bold;
      src: url(${InterBoldWoff}), url(${InterBoldWoff2});
    }

    @font-face {
      font-family: 'Inter';
      font-style: italic;
      src: url(${InterItalicWoff}), url(${InterItalicWoff2});
    }

    @font-face {
      font-family: 'Inter';
      font-style: italic;
      font-weight: bold;
      src: url(${InterBoldItalicWoff}), url(${InterBoldItalicWoff2});
    }

    @font-face {
      font-family: 'Sentinel';
      src: url(${SentinelRegularWoff}), url(${SentinelRegularWoff2});
    }

    @font-face {
      font-family: 'Sentinel';
      font-weight: bold;
      src: url(${SentinelBoldWoff}), url(${SentinelBoldWoff2});
    }

    @font-face {
      font-family: 'Sentinel';
      font-style: italic;
      src: url(${SentinelItalicWoff}), url(${SentinelItalicWoff2});
    }

    @font-face {
      font-family: 'Sentinel';
      font-style: italic;
      font-weight: bold;
      src: url(${SentinelBoldItalicWoff}), url(${SentinelBoldItalicWoff2});
    }

    @font-face {
      font-family: 'Tiempos';
      src: url(${TiemposRegularWoff}), url(${TiemposRegularWoff2});
    }

    @font-face {
      font-family: 'Tiempos';
      font-weight: bold;
      src: url(${TiemposBoldWoff}), url(${TiemposBoldWoff2});
    }

    @font-face {
      font-family: 'Tiempos';
      font-style: italic;
      src: url(${TiemposItalicWoff}), url(${TiemposItalicWoff2});
    }

    @font-face {
      font-family: 'Tiempos';
      font-style: italic;
      font-weight: bold;
      src: url(${TiemposBoldItalicWoff}), url(${TiemposBoldItalicWoff2});
    }

    @font-face {
      font-family: 'Whitney';
      src: url(${WhitneyRegularWoff}), url(${WhitneyRegularWoff2});
    }

    @font-face {
      font-family: 'Whitney';
      font-weight: bold;
      src: url(${WhitneyBoldWoff}), url(${WhitneyBoldWoff2});
    }

    @font-face {
      font-family: 'Whitney';
      font-style: italic;
      src: url(${WhitneyItalicWoff}), url(${WhitneyItalicWoff2});
    }

    @font-face {
      font-family: 'Whitney';
      font-style: italic;
      font-weight: bold;
      src: url(${WhitneyBoldItalicWoff}), url(${WhitneyBoldItalicWoff2});
    }
  }
`
export const FONT_TYPES = {
  blanco: {
    family: 'Blanco',
    name: 'Blanco',
    selector: 'Blanco',
    size: '1em'
  },
  graphik: {
    family: 'Graphik Web',
    name: 'Graphik',
    selector: 'Graphik',
    size: '0.9em'
  },
  ideal: {
    premium: true,
    family: 'IdealSans',
    name: 'Ideal Sans',
    selector: 'Ideal_Sans',
    size: '0.85em'
  },
  inter: {
    premium: true,
    family: 'Inter',
    name: 'Inter',
    selector: 'Inter',
    size: '0.9em'
  },
  plex: {
    premium: true,
    family: 'IBM Plex Sans',
    name: 'Plex Sans',
    selector: 'Plex_Sans',
    size: '0.95em'
  },
  sentinel: {
    premium: true,
    family: 'Sentinel',
    name: 'Sentinel',
    selector: 'Sentinel',
    size: '0.85em'
  },
  tiempos: {
    premium: true,
    family: 'Tiempos',
    name: 'Tiempos',
    selector: 'Tiempos',
    size: '0.9em'
  },
  vollkorn: {
    premium: true,
    family: 'Vollkorn',
    name: 'Vollkorn',
    selector: 'Vollkorn',
    size: '0.95em'
  },
  whitney: {
    premium: true,
    family: 'Whitney',
    name: 'Whitney',
    selector: 'Whitney',
    size: '0.85em'
  },
  zilla: {
    premium: true,
    family: 'Zilla Slab',
    name: 'Zilla Slab',
    selector: 'Zilla_Slab',
    size: '0.95em'
  }
}
