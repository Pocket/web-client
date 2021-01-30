import Document, { Html, Head, Main, NextScript } from 'next/document'
import { COLOR_MODE_PREFIX, CACHE_KEY_COLOR_MODE } from 'common/constants'

class ClientDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
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
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default ClientDocument
