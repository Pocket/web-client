import style from './style.module.css'

// Libraries
import ReactPlayer from 'react-player'

// Components
import { Expand } from './expand'

// Types
import type { Item } from '@common/types'

/**
 * ItemShort
 * ---
 * This is standard video in 16:9 ratio youtube/vimeo/dailymotion and the like
 */
export function ItemVideo({ item }: { item: Item }) {
  const videoUrl = item?.url || false
  const { title, image } = item

  return videoUrl ? (
    <div className={style.base} data-testid="item-video">
      <Expand />
      <figure>
        {['Dailymotion'].includes(item.publisher) ? (
          <img alt={title} src={image?.url as string} />
        ) : (
          <ReactPlayer controls={true} height="100%" loop={true} url={videoUrl} width="100%" />
        )}
      </figure>
    </div>
  ) : null
}
