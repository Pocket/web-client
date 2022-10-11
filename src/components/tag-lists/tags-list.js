import { css } from 'linaria'
import Link from 'next/link'
import { Pill } from 'components/pill/pill'
import { pillboxStyle } from 'components/topics-pillbox/topics-pillbox'
import { SectionHeader } from 'components/headers/section-header'
import { matchSorter } from 'match-sorter'
import { useTranslation, Trans } from 'next-i18next'

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
          data-cy="all-tags-input"
          placeholder={t('tags:search-for-your-tags', 'Search for your tags')}
        />
      </div>
      <div className={pillboxStyle}>
        <ul className="list">
          {'un-tagged'.includes(value) ? (
            <li>
              <Link href={'/saves/tags/_untagged_'}>
                <a data-cy="all-tags-not-tagged">
                  <Pill>
                    <Trans i18nKey="tags:not-tagged">not tagged</Trans>
                  </Pill>
                </a>
              </Link>
            </li>
          ) : null}
          {value.length ? (
            <>
              {sortedTags.map((tag) => (
                <li key={tag}>
                  <Link href={`/saves/tags/${encodeURIComponent(tag)}`}>
                    <a data-cy={`all-tags-${tag}`}>
                      <Pill>{tag}</Pill>
                    </a>
                  </Link>
                </li>
              ))}
            </>
          ) : (
            orderedTags.map((tag) => (
              <li key={tag}>
                <Link href={`/saves/tags/${encodeURIComponent(tag)}`}>
                  <a data-cy={`all-tags-${tag}`}>
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
