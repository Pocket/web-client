import style from './style.module.css'

// Types
import type { Item } from '@common/types'

/**
 * ItemShort
 * ---
 * This is vertical short video format such as tiktok, reels, or youtube shorts
 */
export function ItemShort({ item }: { item: Item }) {
  const htmlEmbed = item?.htmlEmbed ?? false

  return htmlEmbed ? (
    <div className={style.base} data-testid="item-short">
      <figure>
        <iframe src={htmlEmbed}></iframe>
      </figure>
    </div>
  ) : null
}
