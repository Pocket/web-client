import { css } from 'linaria'
import Link from 'next/link'
import { Pill } from '@pocket/web-ui'
import { pillboxStyle } from 'components/topics-pillbox/topics-pillbox'
import { SectionHeader } from 'components/headers/section-header'
import { matchSorter } from 'match-sorter'
import { useTranslation, Trans } from 'react-i18next'

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
    a {
      display: block;
      button {
        width: 100%;
      }
    }
  }
`

export function TagList({ userTags, value, valueChange }) {
  const { t } = useTranslation()

  const sortedTags = matchSorter(userTags, value).slice(0, 5)
  const orderedTags = userTags.sort((a, b) => a.localeCompare(b))

  return (
    <div className={allTagStyle}>
      <SectionHeader sectionTitle={t("All Tags")} />
      <div className="searchBlock">
        <input
          value={value}
          onChange={valueChange}
          type="text"
          placeholder={t("Search for your tags")}
        />
      </div>
      <div className={pillboxStyle}>
        <ul className="list">
          <li>
            <Link href={'/my-list/tags/_untagged_'}>
              <a>
                <Pill><Trans>un-tagged</Trans></Pill>
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
