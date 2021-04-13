import Link from 'next/link'
import { Trans } from 'next-i18next'
import { css } from 'linaria'

import { FavoriteIcon } from '@pocket/web-ui'
import { HighlightIcon } from '@pocket/web-ui'
import { TagIcon } from '@pocket/web-ui'
import { ArticleIcon } from '@pocket/web-ui'
import { ArchiveIcon } from '@pocket/web-ui'
import { VideoIcon } from '@pocket/web-ui'

import { sideNavHeader } from './side-nav'

export function TopicsSideNav({
  subActive,
  pinnedTopics,
  showVoltron
}) {
  return (
    <>
      <div className={sideNavHeader}>
        <Trans i18nKey="nav:topics">Saved Topics</Trans>
      </div>

      {pinnedTopics.length
        ? pinnedTopics.map((topic) => (
            <a href={`https://getpocket.com/explore/${topic.topic_slug}?src=sidebar`} key={topic.topic_slug}>
              <button className={subActive(topic)}>{topic.display_name}</button>
            </a>
          ))
        : null}
    </>
  )
}
