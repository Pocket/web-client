import style from './style.module.css'

import { ItemActions } from '../item-actions'
import { ItemArticleMedia } from '../item-article-media'

// Types
import type { PocketMetadata } from '@common/types/pocket'

/**
 * ItemArticle
 * ---
 * A self contained representation of a piece of written content from around the web
 */
export function ItemArticle({ item }: { item: PocketMetadata }) {
  if (!item) return null

  const { id: itemId, title, excerpt, image, domain, url } = item
  return (
    <article className={style.base} data-testid="item">
      <div>
        <figure>
          <ItemArticleMedia id={itemId} image={image} />
        </figure>
        <div className={style.contentContainer}>
          <div className={style.copy}>
            <cite>{domain?.name}</cite>
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
