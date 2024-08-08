import style from './style.module.css'

import ReactPlayer from 'react-player'

// State
import { useItemDisplay } from '@common/state/item-display'

// Types
import type { Item } from '@common/types'

/**
 * ItemShort
 * ---
 * This is vertical short video format such as tiktok, reels, or youtube shorts
 */
export function ItemShort({ id }: { id: string }) {
  const item = useItemDisplay((state) => state.itemsById[id]) as Item
  const videoUrl = item?.video?.url || false
  const { title, image, url } = item

  return videoUrl ? (
    <div className={style.base} data-testid="item-short">
      <figure>
        {/* {image?.url ? <div style={{ backgroundImage: `url(${image?.url})` }} /> : null} */}
        {['Dailymotion', 'TikTok'].includes(item.publisher) ? (
          <iframe src={videoUrl}></iframe>
        ) : (
          <ReactPlayer controls={true} height="100%" loop={true} url={videoUrl} width="100%" />
        )}
      </figure>
    </div>
  ) : null
}
