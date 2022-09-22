import Head from 'next/head'
import { getImageCacheUrl } from 'common/utilities'
import { FACEBOOK_APP_ID } from 'common/constants'

export const PocketHead = ({ metaData = {}, title: pageTitle, canonical, forceWebView }) => {
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

      {forceWebView ? <meta name="x-pocket-force-webview"/> : null}
      {/*  Primary Meta Tags */}
      <meta name="description" content={description} data-cy="meta-description" />

      {/*  Pocket Specific Tags */}
      <meta name="x-pocket-override-excerpt" content={description} data-cy="pkt-description" />

      {/* Schema.org for Google */}
      <meta itemProp="name" content={title} data-cy="itemprop-name" />
      <meta itemProp="description" content={description} data-cy="itemprop-description" />
      {image ? <meta itemProp="image" content={imageCacheUrl} data-cy="itemprop-image" /> : null}

      {/*  Twitter */}
      <meta name="twitter:card" content={twitterCardType} data-cy="twitter-card" />
      <meta name="twitter:url" content={url} data-cy="twitter-url" />
      <meta name="twitter:title" content={title} data-cy="twitter-title" />
      <meta name="twitter:description" content={description} data-cy="twitter-description" />
      <meta name="twitter:site" content="@pocket" data-cy="twitter-site" />
      {image ? <meta name="twitter:image" content={imageCacheUrl} data-cy="twitter-image" /> : null}

      {/* Open Graph general (Facebook, Pinterest) */}
      <meta property="fb:app_id" content={FACEBOOK_APP_ID} data-cy="fb-app_id" />
      <meta property="og:type" content={ogType} data-cy="og-type" />
      <meta property="og:url" content={url} data-cy="og-url" />
      <meta property="og:title" content={title} data-cy="og-title" />
      <meta property="og:description" content={description} data-cy="og-description" />
      <meta property="og:site_name" content="Pocket" data-cy="og-site_name" />
      {image ? <meta property="og:image" content={imageCacheUrl} data-cy="og-image" /> : null}

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
      <meta name="apple-itunes-app" content="app-id=309601447" />

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
