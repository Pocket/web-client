import Head from 'next/head'
import { getImageCacheUrl } from 'common/utilities/urls/urls'
import { FACEBOOK_APP_ID } from 'common/constants'

export const PocketHead = ({
  metaData = {},
  title: pageTitle,
  canonical,
  syndicatedFrom,
  noIndex,
  forceWebView
}) => {
  const { url = '', description = '', title = '', type = 'website', image } = metaData

  const twitterCardType = image ? 'summary_large_image' : 'summary'
  const ogType = type

  const preferredImageSize = { width: 1200 }
  const imageCacheUrl = image ? getImageCacheUrl(image, preferredImageSize) : null

  return (
    // prettier-ignore
    <Head>
      <title>{pageTitle}</title>

      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {noIndex ? <meta name="robots" content="noindex" /> : null}

      {forceWebView ? <meta name="x-pocket-force-webview"/> : null}
      {/*  Primary Meta Tags */}
      <meta name="description" content={description} />

      {/*  Pocket Specific Tags */}
      <meta name="x-pocket-override-excerpt" content={description} />
      {syndicatedFrom ? <meta name="pocket:syndicated-from" content={syndicatedFrom} /> : null}

      {/* Schema.org for Google */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      {image ? <meta itemProp="image" content={imageCacheUrl} /> : null}

      {/*  Twitter */}
      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@pocket" />
      {image ? <meta name="twitter:image" content={imageCacheUrl} /> : null}

      {/* Open Graph general (Facebook, Pinterest) */}
      <meta property="fb:app_id" content={FACEBOOK_APP_ID} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Pocket" />
      {image ? <meta property="og:image" content={imageCacheUrl} /> : null}

      {/* Progressive Web App based on https://github.com/gokulkrishh/awesome-meta-and-manifest */}
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
      />

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

      {/* manifest.json provides metadata used when your web app is added to the homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/ */}
      <link rel="manifest" href="/manifest.json" />

      {/* Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/i/apple-touch-icon/Pocket_AppIcon_@57.png" />
      <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/i/apple-touch-icon/Pocket_AppIcon_@72.png" />
      <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/i/apple-touch-icon/Pocket_AppIcon_@114.png" />
      <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/i/apple-touch-icon/Pocket_AppIcon_@144.png" />

    </Head>
  )
}
