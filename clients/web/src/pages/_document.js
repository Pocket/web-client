import Document, { Html, Head, Main, NextScript } from 'next/document'
import { COLOR_MODE_PREFIX, CACHE_KEY_COLOR_MODE } from 'common/constants'
import { GOOGLE_ANALYTICS_ID } from 'common/constants'

class ClientDocument extends Document {
  render() {
    return (
      <Html>
        {/* prettier-ignore */}
        <Head>
          {/* Loads an iOS app store banner at the top of Safari */}
          <meta name="apple-itunes-app" content="app-id=309601447" />

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

                if (preferredColorMode === 'system') {
                  const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  preferredColorMode = isSystemDark ? 'dark' : 'light';
                }
              } catch (err) {}

              setColorMode(preferredColorMode);
            })();
            `
            }}
          />

          {/* <!-- OneTrust Cookies Consent Notice start for getpocket.com --> */}
          <script
            async
            src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
            type="text/javascript"
            charSet="UTF-8"
            data-domain-script="a7ff9c31-9f59-421f-9a8e-49b11a3eb24e"></script>
          {/* <!-- OneTrust Cookies Consent Notice end for getpocket.com --> */}

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          />

          <script dangerouslySetInnerHTML={{
            __html: `
              var gptadslots = [];
              var googletag = googletag || {cmd:[]};
            `
            }}
          />
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-P4LPJ42"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}></iframe>
          </noscript>
          {/* End Google Tag Manager (noscript) */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default ClientDocument
