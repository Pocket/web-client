import Link from 'next/link'
import { tagBase, tagWrapper } from 'components/tags/tag'

export function ItemTags({ tags }) {
  return (
    <div className="tags">
      {tags ? (
        <>
          {Object.keys(tags).map((tag) => (
            <span key={tag}>
              <Link href={`/my-list/tags/${encodeURIComponent(tag)}`}>
                <a className={`${tagBase} ${tagWrapper}`}>{tag}</a>
              </Link>
            </span>
          ))}
        </>
      ) : null}
    </div>
  )
}
