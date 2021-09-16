import Link from 'next/link'
import { Trans } from 'next-i18next'
import { sideNavHeader } from './side-nav'

export function TopicsSideNav({ subActive, pinned, clickEvent }) {
  return (
    <>
      <div className={sideNavHeader}>
        <Trans i18nKey="nav:topics">Topics</Trans>
      </div>

      {pinned.length
        ? pinned.map((topic) => (
            <Link href={`/explore/${topic.topic_slug}?src=sidebar`} key={topic.topic_slug}>
              <button
                data-cy={`side-nav-${topic.topic_slug}`}
                className={subActive(topic)}
                onClick={clickEvent}>
                {topic.display_name}
              </button>
            </Link>
          ))
        : null}
    </>
  )
}
