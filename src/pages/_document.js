import Document, { Html, Head, Main, NextScript } from 'next/document'
import { COLOR_MODE_PREFIX, CACHE_KEY_COLOR_MODE } from 'common/constants'

class ClientDocument extends Document {
  render() {
    return (
      <Html>
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

          <script
            dangerouslySetInnerHTML={{
              __html: `
              var timeHolder;

              function dispatchOneTrust(groups){
                if(typeof __NEXT_REDUX_WRAPPER_STORE__ !== 'undefined') {
                  __NEXT_REDUX_WRAPPER_STORE__.dispatch({type: 'ONE_TRUST_DATA', groups})
                } else {
                  clearTimeout(timeHolder); // clear for safety
                  timeHolder = setTimeout(dispatchOneTrust, 50)
                }
              }

              function OptanonWrapper() {
                dispatchOneTrust(OptanonActiveGroups)
              }
              `
            }}
          />
          {/* <!-- OneTrust Cookies Consent Notice end for getpocket.com --> */}
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
