import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="The one true God" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicons/android-icon-96x96.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/android-icon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/android-icon-192x192.png" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta property="og:type" content="website" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
