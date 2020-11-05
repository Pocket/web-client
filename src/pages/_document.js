import Document, { Html, Head, Main, NextScript } from 'next/document'

class ClientDocument extends Document {
  render() {
    return (
      <Html className="colormode-light">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default ClientDocument
