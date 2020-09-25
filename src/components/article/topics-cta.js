// Component last used on 9/14/20 -- delete if stale
import { css } from 'linaria'
import { ArrowRightIcon } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'

const topicsLinkStyles = css`
  padding: var(--spacing100) 0 var(--spacing150);
  font-family: var(--fontSansSerif);
  font-size: var(--fontSize125);
  color: var(--color-textPrimary);

  a {
    text-decoration: none;
    color: var(--color-actionPrimary);
    font-weight: 500;

    &:hover, &:active {
      color: var(--color-actionPrimaryHover);
    }
  }

  .arrow-icon {
    margin-left: 0.15rem;
    margin-top: -0.01rem;
    height: 1.1rem;
  }

  ${breakpointLargeHandset} {
    padding: var(--spacing150) 0 var(--spacing100);
    font-size: var(--fontSize100);
  }
`

export function TopicsCTA({ topic }) {
  if (!topic) return null
  const { topic_slug, display_name }  = topic

  return (topic_slug && display_name) ? (
    <aside className={topicsLinkStyles}>
      Discover more stories in{' '}
      <a href={`/explore/${topic.topic_slug}`}>
        {topic.display_name}
        <ArrowRightIcon className="arrow-icon" />
      </a>
    </aside>
  ) : null
}
