import style from './style.module.css'
import type { ExtPreview } from '../../types'

export function SavedPreview({ preview }: { preview: ExtPreview }) {
  if (!preview) return null

  const cachedImages = preview?.image?.cachedImages
  const image = cachedImages ? cachedImages[0]?.url : false

  const title = preview?.title
  const excerpt = title.length < 80 ? preview?.excerpt : undefined
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
        {excerpt ? <div className={style.excerpt}>{excerpt}</div> : null}
        <div className={style.domain}>{domain}</div>
      </div>
    </div>
  )
}
