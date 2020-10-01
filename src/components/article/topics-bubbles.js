import { css } from 'linaria'
import { CardTopicsNav } from 'components/discover-layouts/card-topics-nav'
import { breakpointLargeHandset } from '@pocket/web-ui'

const topicBubblesStyles = css`
  text-align: left;
  padding-bottom: var(--spacing050);

  h3 {
    font-size: var(--fontSize125);
  }

  ${breakpointLargeHandset} {
    padding-bottom: var(--spacing025);
  }
`

export function TopicsBubbles({ topics }) {
  return <CardTopicsNav topics={topics} classNames={[topicBubblesStyles]} />
}
