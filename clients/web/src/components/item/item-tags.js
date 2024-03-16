import Link from 'next/link'
import { tagBase } from 'components/tags/tag'
import { tagWrapper } from 'components/tags/tag'
import { TagIcon } from '@ui/icons/TagIcon'

export function ItemTags({ tags, mouseLeave }) {
  const handleMouseLeave = function () {
    if (mouseLeave) mouseLeave()
  }
  return (
    <div className="tags-container" onMouseLeave={handleMouseLeave}>
      <TagIcon />
      <div className="tags-list">
        {tags && Array.isArray(tags)
          ? tags.map((tag) => (
              <span className="tag" key={tag.name}>
                <Link
                  href={`/saves/tags/${encodeURIComponent(tag.name)}`}
                  className={`${tagBase} ${tagWrapper}`}>
                  {tag.name}
                </Link>
              </span>
            ))
          : null}
      </div>
    </div>
  )
}
