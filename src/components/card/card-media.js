import classNames from 'classnames'
import { useFallback } from './media-fallback'
import { getImageCacheUrl } from 'common/utilities'

/**
 * Each card contains image/video thumbnails.  This is a separate component so we
 * can handle imperfect content gracefully.
 *
 * The media is presented in a ratio of 3:2, but actual width is determined by
 * the container.  This module simple represents the graceful fallback as opposed
 * to the layout.
 */
export const CardMedia = function ({ image_src, title, id }) {
  /**
   * Fallback images:
   * useFallback checks for imageLoad and if it fails, provides a class
   * that adds a :before and :after to the element for background/letter
   * it also passes back a derived color and letter to add to the style of
   * the containing element to avoid multiple CSS declarations being generated.
   *
   * NOTE: --fallbackBackground uses 8digit hex codes to provide alpha on the
   * background. #RRGGBBAA (red, green, blue, alpha). Important to note these
   * are still hex codes for alpha values so for example:
   *   100%  = FF
   *   90%	 = E6
   *   80%	 = CC
   *   70%	 = B3
   *   60%	 = 99
   *   50%	 = 80
   *   40%	 = 66
   *   30%	 = 4D
   *   20%	 = 33
   *   10%	 = 1A
   *   5%	   = 0D
   *   0%	   = 00
   */

  const cdn_image_src = image_src ? getImageCacheUrl(image_src) : null
  const { fallbackClass, letter, color } = useFallback(cdn_image_src, title, id)
  const className = classNames('media', fallbackClass)

  return (
    <div
      className={className}
      style={{
        backgroundImage: `url('${cdn_image_src}')`,
        '--fallbackBackground': `${color}80`,
        '--fallbackColor': `${color}`,
        '--fallbackLetter': `'${letter}'`
      }}></div>
  )
}
