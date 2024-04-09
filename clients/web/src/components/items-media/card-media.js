import { css } from '@emotion/css'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { getImageCacheUrl } from 'common/utilities/urls/urls'
import { NewViewIcon } from '@ui/icons/NewViewIcon'

const cardMediaStyles = css`
  --aspect-percent: 56.25%;
  .side-by-side & {
    --aspect-percent: 75%;
    .no-link {
      padding-bottom: 66%;
    }
  }

  position: relative;
  border-radius: var(--size025);
  overflow: hidden;
  padding-bottom: 1rem;
  a,
  .no-link {
    position: relative;
    display: block;
    width: 100%;
    padding-bottom: var(--aspect-percent);
    height: 0;
    overflow: hidden;
  }

  img,
  .no-image {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: auto;
    min-height: var(--aspect-percent);
    transition-property: opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease;
    overflow: hidden;
    border-radius: var(--borderRadius);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .no-image {
    &:before {
      content: '';
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, var(--fallbackBackground), var(--fallbackBackground)),
        linear-gradient(to right, var(--color-canvas), var(--color-canvas));
      position: absolute;
      top: 0;
      left: 0;
    }
    &:after {
      content: var(--fallbackLetter);
      color: var(--fallbackColor);
      font-size: 18rem;
      font-weight: 500;
      font-family: var(--fontSerifAlt);
      width: 100%;
      height: 100%;
      position: absolute;
      top: -4rem;
      left: -1rem;
    }
  }
`

/**
 * Each card contains image/video thumbnails.  This is a separate component so we
 * can handle imperfect content gracefully.
 *
 * The media is presented in a ratio of 3:2, but actual width is determined by
 * the container.  This module simple represents the graceful fallback as opposed
 * to the layout.
 */
export const CardMedia = function ({
  image_src,
  title,
  id,
  onImageFail = () => {},
  topicName,
  openUrl,
  onOpen,
  openInNewTab
}) {
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

  const hasImage = !!image_src
  const letter = getFirstLetter(title)
  const color = getColorFromId(id)
  const mediaFallbackDetails = {
    '--fallbackBackground': `${color}80`,
    '--fallbackColor': `${color}`,
    '--fallbackLetter': `'${letter}'`
  }

  const { t } = useTranslation()
  const linkTarget = openInNewTab ? '_blank' : ''
  const linkRel = openInNewTab ? 'noopener' : ''

  const MediaImage = () => {
    return hasImage ? (
      <img
        style={mediaFallbackDetails}
        onError={onImageFail}
        alt=""
        src={getImageCacheUrl(image_src, { width: 640, height: 360 })}
        srcSet={` ${getImageCacheUrl(image_src, { width: 1280, height: 720 })} 2x `}
      />
    ) : (
      <div className="no-image" style={mediaFallbackDetails} />
    )
  }

  const topic = topicName ? topicName.split('_').join(' ').toLowerCase() : false
  /**
   * We are setting these explicitly to avoid the image getting blocked by
   * ad/tracking blockers. They flag images set by JS as block-worthy
   */
  return (
    <div className={`${cardMediaStyles} media`}>
      {topic ? <div className="topic-name">{topic}</div> : null}
      {openUrl ? (
        <Link
          href={openUrl}
          tabIndex="-1"
          data-testid="image-link"
          onClick={onOpen}
          target={linkTarget}
          rel={linkRel}>
          <MediaImage />
          {openInNewTab ? (
            <span className="view-original" data-testid="view-original">
              <span className="view-original-text">
                {t('item-action:view-original', 'View Original')}
              </span>
              <NewViewIcon />
            </span>
          ) : null}
        </Link>
      ) : (
        <span className="no-link">
          <MediaImage />
          {openInNewTab ? (
            <span className="view-original" data-testid="view-original">
              <span className="view-original-text">
                {t('item-action:view-original', 'View Original')}
              </span>
              <NewViewIcon />
            </span>
          ) : null}
        </span>
      )}
    </div>
  )
}

/**
 * Avoid non alphanmericals
 * @param {string} word
 */
function getFirstLetter(word) {
  const firstLetterRegEx = /^(\W?)(\w)?/gu
  const firstLetter = firstLetterRegEx.exec(word)[2]
  return firstLetter ? firstLetter.toUpperCase() : false
}

/**
 * Get a consistent color based on the item_id This should allow us
 * to be consistent across platforms (in theory)
 * @param {string} id
 */
function getColorFromId(id) {
  const _colorCoral = '#EF4056'
  const _colorTeal = '#1CB0A8'
  const _colorAmber = '#FCB643'
  const _colorMint = '#00CB77'

  const colorArray = [
    _colorCoral,
    _colorTeal,
    _colorAmber,
    _colorMint,
    _colorAmber,
    _colorMint,
    _colorCoral,
    _colorTeal
  ]
  const idInt = parseInt(id, 10) // Item Id may not be an int
  const colorIndex = idInt % colorArray.length
  return colorArray[colorIndex || 0]
}
