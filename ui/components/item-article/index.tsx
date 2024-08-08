import style from './style.module.css'

import { ItemActions } from '../item-actions'
import { ItemArticleImage } from '../item-article-image'

// State
import { useItemDisplay } from '@common/state/item-display'

// Types
import type { Item } from '@common/types'

/**
 * Item
 * ---
 * A self contained representation of a piece of content from around the web
 */
export function ItemArticle({ id }: { id: string }) {
  const item = useItemDisplay((state) => state.itemsById[id]) as Item
  if (!item) return null

  const { id: itemId, title, excerpt, image, publisher } = item

  return (
    <article className={style.base} data-testid="item">
      <div>
        <figure>
          <ItemArticleImage id={itemId} imageUrl={image.url} />
        </figure>
        <div className={style.contentContainer}>
          <div className="copy">
            <cite>{publisher}</cite>
            <h3>{title}</h3>
            <p>{excerpt}</p>
          </div>
          <footer>
            <cite>{publisher}</cite>
            <ItemActions />
          </footer>
        </div>
      </div>
    </article>
  )
}
