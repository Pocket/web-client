import Document, { Html, Head, Main, NextScript } from 'next/document'
import { COLOR_MODE_PREFIX, CACHE_KEY_COLOR_MODE } from 'common/constants'

class ClientDocument extends Document {
  render() {
    return (
      <Html>
        {/* prettier-ignore */}
        <Head>
          {/*
          This all sets us up for color themes without having a flash of
          light if the user has chosen another color mode as the default
          */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function () {
              function setColorMode(colorMode) {
                const htmlTag = document && document.documentElement
                htmlTag.classList.toggle('${COLOR_MODE_PREFIX}-light', (!colorMode || colorMode === 'light'))
                htmlTag.classList.toggle('${COLOR_MODE_PREFIX}-dark', colorMode === 'dark')
                htmlTag.classList.toggle('${COLOR_MODE_PREFIX}-sepia', colorMode === 'sepia')
              }

              let preferredColorMode;
              try {
                preferredColorMode = localStorage.getItem('${CACHE_KEY_COLOR_MODE}');
              } catch (err) {}

              setColorMode(preferredColorMode);
            })();
            `
            }}
          />

          {/* <!-- OneTrust Cookies Consent Notice start for getpocket.com --> */}
          <script
            type="text/javascript"
            src="https://cdn.cookielaw.org/consent/a7ff9c31-9f59-421f-9a8e-49b11a3eb24e/OtAutoBlock.js"></script>
          <script
            src="https://cdn.cookielaw.org/consent/a7ff9c31-9f59-421f-9a8e-49b11a3eb24e/otSDKStub.js"
            type="text/javascript"
            charSet="UTF-8"
            data-domain-script="a7ff9c31-9f59-421f-9a8e-49b11a3eb24e"></script>
          {/* <!-- OneTrust Cookies Consent Notice end for getpocket.com --> */}

          {/* Progressive Web App based on https://github.com/gokulkrishh/awesome-meta-and-manifest */}
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />

          {/* Android  */}
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="white" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="black" />
          <meta name="mobile-web-app-capable" content="yes" />

          {/* iOS */}
          <meta name="apple-mobile-web-app-title" content="Pocket" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />

          {/* Windows */}
          <meta name="msapplication-TileColor" content="#ef4056" />
          <meta name="msapplication-TileImage" content="/i/apple-touch-icon/Pocket_AppIcon_@144.png" />

          {/* Pinned Sites */}
          <meta name="application-name" content="Pocket" />
          <meta name="msapplication-tooltip" content="Pocket" />
          <meta name="msapplication-starturl" content="/" />

          {/* UC Mobile Browser */}
          <meta name="full-screen" content="yes" />
          <meta name="browsermode" content="application" />
          <meta name="viewport" content="uc-fitscreen=yes" />
          <meta name="layoutmode" content="fitscreen/standard" />

          {/* manifest.json provides metadata used when your web app is added to the homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/ */}
          <link rel="manifest" href="/manifest.json" />

          {/* Icons */}
          <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/i/apple-touch-icon/Pocket_AppIcon_@57.png" />
          <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/i/apple-touch-icon/Pocket_AppIcon_@72.png" />
          <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/i/apple-touch-icon/Pocket_AppIcon_@114.png" />
          <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/i/apple-touch-icon/Pocket_AppIcon_@144.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default ClientDocument
