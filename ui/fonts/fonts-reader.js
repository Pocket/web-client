/**
 * FONTS FILE
 * -------------------------------------------------------------------------
 * This file is uses to build a fonts file for linaria to compile into our baseline styles
 * but we do some asset cache magic to it during the conversion.  So changes here will still
 * need to be compiled in order for them to show up
 */
import { css } from 'linaria'

import IdealSansWoff from './ideal-sans/IdealSansSSm-Book_Web.woff'
import IdealSansWoff2 from './ideal-sans/IdealSansSSm-Book_Web.woff2'
import IdealSansItalicWoff from './ideal-sans/IdealSansSSm-BookItalic_Web.woff'
import IdealSansItalicWoff2 from './ideal-sans/IdealSansSSm-BookItalic_Web.woff2'
import IdealSansBoldWoff from './ideal-sans/IdealSansSSm-Semibold_Web.woff'
import IdealSansBoldWoff2 from './ideal-sans/IdealSansSSm-Semibold_Web.woff2'
import IdealSansBoldItalicWoff from './ideal-sans/IdealSansSSm-SemiboldItalic_Web.woff'
import IdealSansBoldItalicWoff2 from './ideal-sans/IdealSansSSm-SemiboldItalic_Web.woff2'

import InterRegularWoff from './inter/Inter-Regular.woff'
import InterRegularWoff2 from './inter/Inter-Regular.woff2'
import InterItalicWoff from './inter/Inter-Italic.woff'
import InterItalicWoff2 from './inter/Inter-Italic.woff2'
import InterBoldWoff from './inter/Inter-Bold.woff'
import InterBoldWoff2 from './inter/Inter-Bold.woff2'
import InterBoldItalicWoff from './inter/Inter-BoldItalic.woff'
import InterBoldItalicWoff2 from './inter/Inter-BoldItalic.woff2'

import SentinelRegularWoff from './sentinel/Sentinel-Book_Web.woff'
import SentinelRegularWoff2 from './sentinel/Sentinel-Book_Web.woff2'
import SentinelItalicWoff from './sentinel/Sentinel-BookItalic_Web.woff'
import SentinelItalicWoff2 from './sentinel/Sentinel-BookItalic_Web.woff2'
import SentinelBoldWoff from './sentinel/Sentinel-Semibold_Web.woff'
import SentinelBoldWoff2 from './sentinel/Sentinel-Semibold_Web.woff2'
import SentinelBoldItalicWoff from './sentinel/Sentinel-SemiboldItalic_Web.woff'
import SentinelBoldItalicWoff2 from './sentinel/Sentinel-SemiboldItalic_Web.woff2'

import TiemposRegularWoff from './tiempos/TiemposTextWeb-Regular.woff'
import TiemposRegularWoff2 from './tiempos/TiemposTextWeb-Regular.woff2'
import TiemposItalicWoff from './tiempos/TiemposTextWeb-RegularItalic.woff'
import TiemposItalicWoff2 from './tiempos/TiemposTextWeb-RegularItalic.woff2'
import TiemposBoldWoff from './tiempos/TiemposTextWeb-Semibold.woff'
import TiemposBoldWoff2 from './tiempos/TiemposTextWeb-Semibold.woff2'
import TiemposBoldItalicWoff from './tiempos/TiemposTextWeb-SemiboldItalic.woff'
import TiemposBoldItalicWoff2 from './tiempos/TiemposTextWeb-SemiboldItalic.woff2'

import WhitneyRegularWoff from './whitney/Whitney-Book_Web.woff'
import WhitneyRegularWoff2 from './whitney/Whitney-Book_Web.woff2'
import WhitneyItalicWoff from './whitney/Whitney-BookItal_Web.woff'
import WhitneyItalicWoff2 from './whitney/Whitney-BookItal_Web.woff2'
import WhitneyBoldWoff from './whitney/Whitney-Semibld_Web.woff'
import WhitneyBoldWoff2 from './whitney/Whitney-Semibld_Web.woff2'
import WhitneyBoldItalicWoff from './whitney/Whitney-SemibldItal_Web.woff'
import WhitneyBoldItalicWoff2 from './whitney/Whitney-SemibldItal_Web.woff2'

/**
 * Fonts *
 * This file defines all of our font families and styles for use in CSS in the reader.
 */

export const ReaderFonts = css`
  :global() {
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
      src: url(${IdealSansBoldItalicWoff}), url(${IdealSansBoldItalicWoff2});
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
