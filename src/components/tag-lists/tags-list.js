import { css } from 'linaria'
import Link from 'next/link'
import { Pill } from '@pocket/web-ui'
import { Button } from '@pocket/web-ui'
import { pillboxStyle } from 'components/topics-pillbox/topics-pillbox'
import { SectionHeader } from 'components/headers/section-header'
import { matchSorter } from 'match-sorter'
import { useTranslation, Trans } from 'common/setup/i18n'
import { FeatureFlag } from 'connectors/feature-flags/feature-flags'

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

const headerRow = css`
  h4 {
    display: inline-block;
    margin-right: 1.5rem;
  }
`

export function TagList({ userTags, value, valueChange, shareTag }) {
  const { t } = useTranslation()

  const sortedTags = matchSorter(userTags, value).slice(0, 5)
  const orderedTags = userTags.sort((a, b) => a.localeCompare(b))

  return (
    <div className={allTagStyle}>
      <section className={headerRow}>
        <SectionHeader sectionTitle={t('tags:all-tags', 'All Tags')} />
        <FeatureFlag flag="temp.web.client.tag.collection.share">
          <Button
            className="share"
            size="small"
            href="/public/configure"
            target="_blank"
            onClick={shareTag}>
            Share
          </Button>
        </FeatureFlag>
      </section>

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
          {'un-tagged'.includes(value) ? (
            <li>
              <Link href={'/my-list/tags/_untagged_'}>
                <a>
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
