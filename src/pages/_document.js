import Document, { Html, Head, Main, NextScript } from 'next/document'
import { COLOR_MODE_PREFIX, CACHE_KEY_COLOR_MODE } from 'common/constants'
import { GOOGLE_ANALYTICS_ID } from 'common/constants'

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
            src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"  
            type="text/javascript" 
            charSet="UTF-8" 
            data-domain-script="a7ff9c31-9f59-421f-9a8e-49b11a3eb24e"></script>
          {/* <!-- OneTrust Cookies Consent Notice end for getpocket.com --> */}

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
          `
            }}
          />

          <script async src='https://securepubads.g.doubleclick.net/tag/js/gpt.js' />
          <script dangerouslySetInnerHTML={{
            __html: `
              var gptadslots = [];
              var googletag = googletag || {cmd:[]};
            `
            }} 
          />

        <script async src='https://fdyn.pubwise.io/script/8bfeb37f-2e7b-4828-a1ef-65bed8f5f77c/v3/dyn/pre_pws.js'/>
        <script async src='https://fdyn.pubwise.io/script/8bfeb37f-2e7b-4828-a1ef-65bed8f5f77c/v3/dyn/pws.js'/>

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
