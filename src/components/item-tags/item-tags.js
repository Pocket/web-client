import Link from 'next/link'
import { tagBase } from 'components/tags/tag'
import { tagWrapper } from 'components/tags/tag'

export function ItemTags({ tags }) {
  return (
    <div className="tags">
      {tags
        ? tags.map((tag) => (
            <span key={tag.name}>
              <Link href={`/my-list/tags/${encodeURIComponent(tag.name)}`}>
                <a className={`${tagBase} ${tagWrapper}`}>{tag.name}</a>
              </Link>
            </span>
          ))
        : null}
    </div>
  )
}
