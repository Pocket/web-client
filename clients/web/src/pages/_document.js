import Document, { Html, Head, Main, NextScript } from 'next/document'
import { COLOR_MODE_PREFIX, CACHE_KEY_COLOR_MODE } from 'common/constants'

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
