import style from './style.module.css'
import type { ExtItem, ExtPreviewItem } from '../../assets/types'

export function SavedPreview({ item }: { item: ExtItem }) {
  if (item && 'status' in item) return <>Loading</>

  const validItem = item as ExtPreviewItem
  const preview = validItem?.preview

  const cachedImages = preview?.image?.cachedImages
  const image = cachedImages ? cachedImages[0]?.url : false

  const title = preview?.title
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
        <div className={style.domain}>{domain}</div>
      </div>
    </div>
  )
}
