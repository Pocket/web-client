import { testIdAttribute } from '@pocket/web-utilities/test-utils'
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
      <meta name="description" content={description} {...testIdAttribute('meta-description')} />

      {/* Schema.org for Google */}
      <meta itemProp="name" content={title} {...testIdAttribute('itemprop-name')}/>
      <meta itemProp="description" content={description} {...testIdAttribute('itemprop-description')}/>
      {image ? <meta itemProp="image" content={imageCacheUrl} {...testIdAttribute('itemprop-image')} /> : null}

      {/*  Twitter */}
      <meta name="twitter:card" content={twitterCardType} {...testIdAttribute('twitter-card')}/>
      <meta name="twitter:url" content={url} {...testIdAttribute('twitter-url')}/>
      <meta name="twitter:title" content={title} {...testIdAttribute('twitter-title')}/>
      <meta name="twitter:description" content={description} {...testIdAttribute('twitter-description')}/>
      <meta name="twitter:site" content="@pocket" {...testIdAttribute('twitter-site')}/>
      {image ? <meta name="twitter:image" content={imageCacheUrl} {...testIdAttribute('twitter-image')}/> : null}

      {/* Open Graph general (Facebook, Pinterest) */}
      <meta property="fb:app_id" content={FACEBOOK_APP_ID} {...testIdAttribute('fb-app_id')}/>
      <meta property="og:type" content={ogType} {...testIdAttribute('og-type')}/>
      <meta property="og:url" content={url} {...testIdAttribute('og-url')}/>
      <meta property="og:title" content={title} {...testIdAttribute('og-title')}/>
      <meta property="og:description" content={description} {...testIdAttribute('og-description')}/>
      <meta property="og:site_name" content="Pocket" {...testIdAttribute('og-site_name')}/>
      {image ? <meta property="og:image" content={imageCacheUrl} {...testIdAttribute('og-image')}/> : null}
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
