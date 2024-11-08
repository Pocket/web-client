import style from './style.module.css'

import ReactPlayer from 'react-player'

// Types
import type { Item } from '@common/types'

/**
 * ItemShort
 * ---
 * This is vertical short video format such as tiktok, reels, or youtube shorts
 */
export function ItemSound({ item }: { item: Item }) {
  const soundUrl = (item?.url as string) ?? false

  return soundUrl ? (
    <div className={style.base} data-testid="item-short">
      <figure>
        <ReactPlayer controls={true} height="100%" loop={true} url={soundUrl} width="100%" />
      </figure>
    </div>
  ) : null
}
