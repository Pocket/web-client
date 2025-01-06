import style from './style.module.css'
import type { ExtPreview } from '../../types'

export function SavedPreview({ preview }: { preview: ExtPreview }) {
  if (!preview) return null

  const cachedImages = preview?.image?.cachedImages
  const image = cachedImages ? cachedImages[0]?.url : false

  const title = preview?.title
  const excerpt = preview?.excerpt
  const domain = preview?.domain?.name

  return (
    <div className={style.preview}>
      {image ? (
        <picture>
          <img src={image} alt="" />
        </picture>
      ) : null}
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.excerpt}>{excerpt}</div>
        <div className={style.domain}>{domain}</div>
      </div>
    </div>
  )
}
