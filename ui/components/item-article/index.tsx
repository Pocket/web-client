import style from './style.module.css'

import { ItemActions } from '../item-actions'
import { ItemArticleMedia } from '../item-article-media'

// Types
import type { Item } from '@common/types'

/**
 * ItemArticle
 * ---
 * A self contained representation of a piece of written content from around the web
 */
export function ItemArticle({ item }: { item: Item }) {
  if (!item) return null

  const { id: itemId, title, excerpt, image, publisher, topic, url } = item
  return (
    <article className={style.base} data-testid="item">
      <div>
        <figure>
          <ItemArticleMedia id={itemId} imageUrl={image?.url} />
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
            <ItemActions id={itemId} />
          </footer>
        </div>
      </div>
    </article>
  )
}
