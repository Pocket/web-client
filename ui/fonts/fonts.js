/**
 * FONTS FILE
 * -------------------------------------------------------------------------
 * This file is uses to build a fonts file for linaria to compile into our baseline styles
 * but we do some asset cache magic to it during the conversion.  So changes here will still 
 * need to be compiled in order for them to show up
 */

import { css } from 'linaria'

// Blanco
import blancoOSFWebRegularWoff from './blanco-osf/BlancoOSFWeb-Regular.woff'
import blancoOSFWebRegularWoff2 from './blanco-osf/BlancoOSFWeb-Regular.woff2'

import blancoOSFWebBoldWoff from './blanco-osf/BlancoOSFWeb-Bold.woff'
import blancoOSFWebBoldWoff2 from './blanco-osf/BlancoOSFWeb-Bold.woff2'

import blancoOSFWebItalicWoff from './blanco-osf/BlancoOSFWeb-Italic.woff'
import blancoOSFWebItalicWoff2 from './blanco-osf/BlancoOSFWeb-Italic.woff2'

import blancoOSFWebBoldItalicWoff from './blanco-osf/BlancoOSFWeb-BoldItalic.woff'
import blancoOSFWebBoldItalicWoff2 from './blanco-osf/BlancoOSFWeb-BoldItalic.woff2'

// Doyle
import doyleRegularWoff from './doyle/Doyle-Regular.woff'
import doyleRegularWoff2 from './doyle/Doyle-Regular.woff2'

import doyleRegularItalicWoff from './doyle/Doyle-RegularItalic.woff'
import doyleRegularItalicWoff2 from './doyle/Doyle-RegularItalic.woff2'

import doyleMediumWoff from './doyle/Doyle-Medium.woff'
import doyleMediumWoff2 from './doyle/Doyle-Medium.woff2'

import doyleMediumItalicWoff from './doyle/Doyle-MediumItalic.woff'
import doyleMediumItalicWoff2 from './doyle/Doyle-MediumItalic.woff2'

// Graphik
import graphikBlackWebWoff from './graphik-web/Graphik-Black-Web.woff'
import graphikBlackWebWoff2 from './graphik-web/Graphik-Black-Web.woff2'

import graphikBlackItalicWebWoff from './graphik-web/Graphik-BlackItalic-Web.woff'
import graphikBlackItalicWebWoff2 from './graphik-web/Graphik-BlackItalic-Web.woff2'

import graphikBoldWebWoff from './graphik-web/Graphik-Bold-Web.woff'
import graphikBoldWebWoff2 from './graphik-web/Graphik-Bold-Web.woff2'

import graphikBoldItalicWebWoff from './graphik-web/Graphik-BoldItalic-Web.woff'
import graphikBoldItalicWebWoff2 from './graphik-web/Graphik-BoldItalic-Web.woff2'

import graphikExtralightWebWoff from './graphik-web/Graphik-Extralight-Web.woff'
import graphikExtralightWebWoff2 from './graphik-web/Graphik-Extralight-Web.woff2'

import graphikExtralightItalicWebWoff from './graphik-web/Graphik-ExtralightItalic-Web.woff'
import graphikExtralightItalicWebWoff2 from './graphik-web/Graphik-ExtralightItalic-Web.woff2'

import graphikLightWebWoff from './graphik-web/Graphik-Light-Web.woff'
import graphikLightWebWoff2 from './graphik-web/Graphik-Light-Web.woff2'

import graphikLightItalicWebWoff from './graphik-web/Graphik-LightItalic-Web.woff'
import graphikLightItalicWebWoff2 from './graphik-web/Graphik-LightItalic-Web.woff2'

import graphikMediumWebWoff from './graphik-web/Graphik-Medium-Web.woff'
import graphikMediumWebWoff2 from './graphik-web/Graphik-Medium-Web.woff2'

import graphikMediumItalicWebWoff from './graphik-web/Graphik-MediumItalic-Web.woff'
import graphikMediumItalicWebWoff2 from './graphik-web/Graphik-MediumItalic-Web.woff2'

import graphikRegularWebWoff from './graphik-web/Graphik-Regular-Web.woff'
import graphikRegularWebWoff2 from './graphik-web/Graphik-Regular-Web.woff2'

import graphikRegularItalicWebWoff from './graphik-web/Graphik-RegularItalic-Web.woff'
import graphikRegularItalicWebWoff2 from './graphik-web/Graphik-RegularItalic-Web.woff2'

import graphikSemiboldWebWoff from './graphik-web/Graphik-Semibold-Web.woff'
import graphikSemiboldWebWoff2 from './graphik-web/Graphik-Semibold-Web.woff2'

import graphikSemiboldItalicWebWoff from './graphik-web/Graphik-SemiboldItalic-Web.woff'
import graphikSemiboldItalicWebWoff2 from './graphik-web/Graphik-SemiboldItalic-Web.woff2'

import graphikSuperWebWoff from './graphik-web/Graphik-Super-Web.woff'
import graphikSuperWebWoff2 from './graphik-web/Graphik-Super-Web.woff2'

import graphikSuperItalicWebWoff from './graphik-web/Graphik-SuperItalic-Web.woff'
import graphikSuperItalicWebWoff2 from './graphik-web/Graphik-SuperItalic-Web.woff2'

import graphikThinWebWoff from './graphik-web/Graphik-Thin-Web.woff'
import graphikThinWebWoff2 from './graphik-web/Graphik-Thin-Web.woff2'

import graphikThinItalicWebWoff from './graphik-web/Graphik-ThinItalic-Web.woff'
import graphikThinItalicWebWoff2 from './graphik-web/Graphik-ThinItalic-Web.woff2'

/**
 * Fonts *
 * This file defines all of our font families and styles for use in CSS in general.
 */

export const Fonts = css`
  :global() {
    @font-face {
      font-family: 'Blanco OSF';
      src: url(${blancoOSFWebRegularWoff}), url(${blancoOSFWebRegularWoff2});
    }

    @font-face {
      font-family: 'Blanco OSF';
      font-weight: bold;
      src: url(${blancoOSFWebBoldWoff}), url(${blancoOSFWebBoldWoff2});
    }

    @font-face {
      font-family: 'Blanco OSF';
      font-style: italic;
      src: url(${blancoOSFWebItalicWoff}), url(${blancoOSFWebItalicWoff2});
    }

    @font-face {
      font-family: 'Blanco OSF';
      font-style: italic;
      font-weight: bold;
      src: url(${blancoOSFWebBoldItalicWoff}),
        url(${blancoOSFWebBoldItalicWoff2});
    }

    @font-face {
      font-family: 'Doyle';
      font-weight: 400;
      src: url(${doyleRegularWoff}), url(${doyleRegularWoff2});
    }

    @font-face {
      font-family: 'Doyle';
      font-weight: 400;
      font-style: italic;
      src: url(${doyleRegularItalicWoff}), url(${doyleRegularItalicWoff2});
    }

    @font-face {
      font-family: 'Doyle';
      font-weight: 500;
      src: url(${doyleMediumWoff}), url(${doyleMediumWoff2});
    }

    @font-face {
      font-family: 'Doyle';
      font-weight: 500;
      font-style: italic;
      src: url(${doyleMediumItalicWoff}), url(${doyleMediumItalicWoff2});
    }

    @font-face {
      font-family: 'Graphik Web';
      font-weight: 100;
      src: url(${graphikThinWebWoff}), url(${graphikThinWebWoff2});
    }
    @font-face {
      font-family: 'Graphik Web';
      font-weight: 100;
      font-style: italic;
      src: url(${graphikThinItalicWebWoff}), url(${graphikThinItalicWebWoff2});
    }
    @font-face {
      font-family: 'Graphik Web';
      font-weight: 200;
      src: url(${graphikExtralightWebWoff}), url(${graphikExtralightWebWoff2});
    }
    @font-face {
      font-family: 'Graphik Web';
      font-weight: 200;
      font-style: italic;
      src: url(${graphikExtralightItalicWebWoff}),
        url(${graphikExtralightItalicWebWoff2});
    }
    @font-face {
      font-family: 'Graphik Web';
      font-weight: 300;
      src: url(${graphikLightWebWoff}), url(${graphikLightWebWoff2});
    }
    @font-face {
      font-family: 'Graphik Web';
      font-weight: 300;
      font-style: italic;
      src: url(${graphikLightItalicWebWoff}), url(${graphikLightItalicWebWoff2});
    }
    @font-face {
      font-family: 'Graphik Web';
      font-weight: 400;
      src: url(${graphikRegularWebWoff}), url(${graphikRegularWebWoff2});
    }
    @font-face {
      font-family: 'Graphik Web';
      font-weight: 400;
      font-style: italic;
      src: url(${graphikRegularItalicWebWoff}),
        url(${graphikRegularItalicWebWoff2});
    }
    @font-face {
      font-family: 'Graphik Web';
      font-weight: 500;
      src: url(${graphikMediumWebWoff}), url(${graphikMediumWebWoff2});
    }
    @font-face {
      font-family: 'Graphik Web';
      font-weight: 500;
      font-style: italic;
      src: url(${graphikMediumItalicWebWoff}),
        url(${graphikMediumItalicWebWoff2});
    }
    @font-face {
      font-family: 'Graphik Web';
      font-weight: 600;
      src: url(${graphikSemiboldWebWoff}), url(${graphikSemiboldWebWoff2});
    }
    @font-face {
      font-family: 'Graphik Web';
      font-weight: 600;
      font-style: italic;
      src: url(${graphikSemiboldItalicWebWoff}),
        url(${graphikSemiboldItalicWebWoff2});
    }
    @font-face {
      font-family: 'Graphik Web';
      font-weight: 700;
      src: url(${graphikBoldWebWoff}), url(${graphikBoldWebWoff2});
    }
    @font-face {
      font-family: 'Graphik Web';
      font-weight: 700;
      font-style: italic;
      src: url(${graphikBoldItalicWebWoff}), url(${graphikBoldItalicWebWoff2});
    }
    @font-face {
      font-family: 'Graphik Web';
      font-weight: 800;
      src: url(${graphikBlackWebWoff}), url(${graphikBlackWebWoff2});
    }
    @font-face {
      font-family: 'Graphik Web';
      font-weight: 800;
      font-style: italic;
      src: url(${graphikBlackItalicWebWoff}), url(${graphikBlackItalicWebWoff2});
    }
    @font-face {
      font-family: 'Graphik Web';
      font-weight: 900;
      src: url(${graphikSuperWebWoff}), url(${graphikSuperWebWoff2});
    }
    @font-face {
      font-family: 'Graphik Web';
      font-weight: 900;
      font-style: italic;
      src: url(${graphikSuperItalicWebWoff}), url(${graphikSuperItalicWebWoff2});
    }
  }
`
