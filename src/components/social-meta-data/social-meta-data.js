import { getImageCacheUrl } from 'common/utilities'
import PropTypes from 'prop-types'
import { FACEBOOK_APP_ID } from 'common/constants'

/**
 * Social Meta Data
 * This adds appropriate tags for social meta data to be added.
 * This is included in the layout of the project so to use it
 * you simply need to pass in a `metaData` param to the layout
 * component.
 *
 * metaData:
 * @param {object, props}
 *  - @property {string}: url for page to share (required)
 *  - @property {string}: title for page to share (required)
 *  - @property {string}: description for page to share (required)
 *  - @property {string}: image for page for page to share (optional)
 *  - @property {string}: type of page being shared, defaults to 'website' (optional)
 */
export function SocialMetaData({ url, title, description, image, type }) {
  if (!url || !title || !description) return null

  const twitterCardType = image ? 'summary_large_image' : 'summary'
  const ogType = type || 'website'

  const preferredImageSize = { width: 1200 }
  const imageCacheUrl = image
    ? getImageCacheUrl(image, preferredImageSize)
    : null

  return (
    // prettier-ignore
    <>
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
    </>
  )
}

SocialMetaData.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string
}
