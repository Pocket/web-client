import style from './style.module.css'

import { ColorPlanes } from './color-planes'
import { Image } from '@common/types/pocket'

/**
 * ItemArticleMedia
 * ---
 * Media Block that will load an image, handle failure, display a fall back
 * and do your dishes ... one of these statements is not true.  The game is afoot!
 */

export function ItemArticleMedia({
  image,
  id = '1'
}: {
  image?: Omit<Image, 'imageId' | 'src' | 'url'> | null
  id: string
}) {
  const colorToUse = getColorFromId(id)
  const { width, height } = { width: 640, height: 360 }
  const imageUrlToUse: string | false = (image?.cachedImages?.[0]?.url as string) ?? false

  return (
    <div className={style.base} data-color={colorToUse} data-testid="item-media">
      {imageUrlToUse ? (
        <img alt="" src={imageUrlToUse} />
      ) : (
        <ColorPlanes height={height} width={width} />
      )}
    </div>
  )
}

/**
 * getColorFromId
 * ---
 * Get a consistent color based on the item_id This should allow us
 * to be consistent across platforms (in theory)
 * @param id
 */
function getColorFromId(id: string) {
  const colorArray = [
    'coral',
    'teal',
    'apricot',
    'mint',
    'lapis',
    'iris',
    'apricot',
    'mint',
    'coral',
    'teal'
  ]
  const idInt = parseInt(id, 10) // Item Id may not be an int
  const colorIndex = idInt % colorArray.length
  return colorArray[colorIndex || 0]
}
