import { css, cx } from '@emotion/css'
import TopicsPillbox from 'components/topics-pillbox/topics-pillbox'
import { breakpointLargeTablet } from 'common/constants'
import { breakpointTinyTablet } from 'common/constants'

const topicsNavRightRailStyle = css`
  grid-column: 10 / span 3;
  grid-row: span 5;
  .inner {
    max-width: 800px;
    margin: 0 auto;
  }

  ${breakpointLargeTablet} {
    grid-column: 1 / span 12;
    grid-row: span 1;
    text-align: center;
    border-top: 1px solid var(--color-dividerTertiary);
    border-bottom: 1px solid var(--color-dividerTertiary);
    padding: var(--spacing250) 0;
  }

  ${breakpointTinyTablet} {
    padding: var(--spacing150) 0 var(--spacing100);
  }
`

const topicsNavBottomStyle = css`
  grid-column: 1 / span 12;
  grid-row: span 1;
  padding: var(--spacing250) 0 var(--spacing150);
  border-bottom: 1px solid var(--color-dividerTertiary);
  text-align: center;

  &.no-border {
    border-bottom: none;
  }

  .inner {
    max-width: 800px;
    margin: 0 auto;
  }

  ${breakpointTinyTablet} {
    padding: var(--spacing150) 0 0;
  }
`

const topicsNavBottomHeadingStyle = css`
  ${breakpointLargeTablet} {
    font-size: var(--fontSize125);
  }
`

export function CardTopicsNav({ topics, rail, track, className }) {
  const moduleClass = rail ? topicsNavRightRailStyle : topicsNavBottomStyle
  const headingClass = rail ? 'h6' : topicsNavBottomHeadingStyle

  return (
    <div className={cx('cardTopicsNav', moduleClass, className)}>
      <div className="inner">
        <TopicsPillbox
          id={rail ? 'right-rail-topics' : 'page-bottom-topics'}
          topicsMap={topics}
          headingText="Discover More Topics"
          headingClassName={headingClass}
          onTopicClick={track}
        />
      </div>
    </div>
  )
}
