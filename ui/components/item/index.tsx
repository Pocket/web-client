import style from './style.module.css'

import { ItemActions } from '../item-actions'
import { ItemMedia } from '../item-media'

// Types
import type { Item } from '@common/types'

/**
 * Item
 * ---
 * A self contained representation of a piece of content from around the web
 * Change for lint check
 */
export function Item({ item }: { item: Item }) {
  if (!item) return null

  const { id: itemId, title, excerpt, image, publisher, topic, url } = item
  return (
    <article className={style.base} data-testid="item">
      <div>
        <figure>
          <ItemMedia id={itemId} imageUrl={image?.url} />
        </figure>
        <div className={style.contentContainer}>
          <div className={style.copy}>
            <cite>{publisher}</cite>
            <h3>
              <a href={url} target="_blank">
                {title}
              </a>
            </h3>
            <p>{excerpt}</p>
          </div>
          <footer>
            <cite>{publisher}</cite>
            <ItemActions id={itemId} />
          </footer>
        </div>
      </div>
    </article>
  )
}
