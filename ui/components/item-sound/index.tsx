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
export function ItemSound({ id }: { id: string }) {
  const item = useItemDisplay((state) => state.itemsById[id]) as Item
  const soundUrl = item?.url || false

  return soundUrl ? (
    <div className={style.base} data-testid="item-short">
      <figure>
        <ReactPlayer controls={true} height="100%" loop={true} url={soundUrl} width="100%" />
      </figure>
    </div>
  ) : null
}
