import { css } from 'linaria'
import Link from 'next/link'
import { Pill } from '@pocket/web-ui'
import { pillboxStyle } from 'components/topics-pillbox/topics-pillbox'
import { SectionHeader } from 'components/headers/section-header'
import { matchSorter } from 'match-sorter'
import { useTranslation, Trans } from 'common/setup/i18n'

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
      <SectionHeader sectionTitle={t('tags:all-tags', 'All Tags')} />
      <div className="searchBlock">
        <input
          value={value}
          onChange={valueChange}
          type="text"
          placeholder={t('tags:search-for-your-tags', 'Search for your tags')}
        />
      </div>
      <div className={pillboxStyle}>
        <ul className="list">
          <li>
            <Link href={'/my-list/tags/_untagged_'}>
              <a>
                <Pill>
                  <Trans i18nKey="tags:un-tagged">un-tagged</Trans>
                </Pill>
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
