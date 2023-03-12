import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:image" content="https://notsoerudite.com/link-preview.png" />
          <meta property="twitter:image" content="https://notsoerudite.com/link-preview.png" />

          {/* <meta name="twitter:site" content="@nytimes"> */}
          {/* <meta name="twitter:creator" content="@SarahMaslinNir"> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;