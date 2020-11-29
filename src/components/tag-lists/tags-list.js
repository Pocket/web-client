import { css } from 'linaria'
import Link from 'next/link'
import { Pill } from '@pocket/web-ui'
import { pillboxStyle } from 'components/topics-pillbox/topics-pillbox'
import { SectionHeader } from 'components/headers/section-header'
import { matchSorter } from 'match-sorter'

const allTagStyle = css`
  .searchBlock {
    width: 100%;
    padding: 0 0 1rem;
    input {
      width: 100%;
      max-width: initial;
    }
  }
  .list {
    column-count: 3;
    li {
      display: block;
    }
    a {
      display: block;
      button {
        width: 100%;
      }
    }
  }
`

export function TagList({ userTags, value, valueChange }) {
  const sortedTags = matchSorter(userTags, value).slice(0, 5)
  const orderedTags = userTags.sort((a, b) => a.localeCompare(b))

  return (
    <div className={allTagStyle}>
      <SectionHeader sectionTitle="All Tags" />
      <div className="searchBlock">
        <input
          value={value}
          onChange={valueChange}
          type="text"
          placeholder="Search for your tags"
        />
      </div>
      <div className={pillboxStyle}>
        <ul className="list">
          <li>
            <Link href={'/my-list/tags/_untagged_'}>
              <a>
                <Pill>un-tagged</Pill>
              </a>
            </Link>
          </li>
          {value.length ? (
            <>
              {sortedTags.map((tag) => (
                <li key={tag}>
                  <Link href={`/my-list/tags/${encodeURIComponent(tag)}`}>
                    <a>
                      <Pill>{tag}</Pill>
                    </a>
                  </Link>
                </li>
              ))}
            </>
          ) : (
            orderedTags.map((tag) => (
              <li key={tag}>
                <Link href={`/my-list/tags/${encodeURIComponent(tag)}`}>
                  <a>
                    <Pill>{tag}</Pill>
                  </a>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
