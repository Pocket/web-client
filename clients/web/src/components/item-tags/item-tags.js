import Link from 'next/link'
import { tagBase } from 'components/tags/tag'
import { tagWrapper } from 'components/tags/tag'

export function ItemTags({ tags }) {
  return (
    <div className="tags">
      {tags && Array.isArray(tags)
        ? tags.map((tag) => (
            <span key={tag.name}>
              <Link
                href={`/saves/tags/${encodeURIComponent(tag.name)}`}
                className={`${tagBase} ${tagWrapper}`}>
                {tag.name}
              </Link>
            </span>
          ))
        : null}
    </div>
  )
}
