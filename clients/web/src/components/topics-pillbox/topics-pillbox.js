import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from '@emotion/css'

import { Pill } from 'components/pill/pill'

export const pillboxStyle = css`
  h4 {
    margin-bottom: var(--spacing150);
    font-family: var(--fontSansSerif);
    font-weight: 600;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;
      margin: 0 var(--spacing050) var(--spacing075) 0;
    }
  }

  &.align-center {
    text-align: center;

    li {
      margin: 0 var(--spacing025) var(--spacing075);
    }
  }
`

const TopicsPillbox = ({
  id,
  omitPromoted,
  topicsMap = null,
  headingText = 'Discover Articles By Topic',
  headingClassName = null,
  alignItems = 'left',
  onTopicClick = () => {}
}) => {
  topicsMap = topicsMap || {}
  const topicsKeys = Object.keys(topicsMap).filter((topic) =>
    omitPromoted ? !topicsMap[topic].is_promoted : true
  )
  const topicsArray = topicsKeys.map((key) => {
    return topicsMap[key]
  })
  // need to display "promoted" topics at the front of the list
  const sortedTopics = topicsArray.sort((topic1, topic2) => {
    if (topic1.is_promoted && !topic2.is_promoted) return -1
    if (!topic1.is_promoted && topic2.is_promoted) return 1
    return 0
  })

  function handleTopicClick(event, topicId, topicIndex) {
    onTopicClick(topicId, topicIndex, id)
  }

  return (
    <div className={cx(pillboxStyle, `align-${alignItems}`)}>
      <h4 className={cx('h5', headingClassName)} data-testid="heading">
        {headingText}
      </h4>
      <ul>
        {sortedTopics.map((topic, index) => {
          return (
            <li key={`topics-pillbox-${id}-${topic.topic}`}>
              <Pill
                href={`/explore/${topic.topic_slug}`}
                promoted={topic.is_promoted}
                onClick={(event) => {
                  handleTopicClick(event, topic.topic, index)
                }}
                data-testid={`topic-pill-${topic.topic}`}>
                {topic.display_name}
              </Pill>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

TopicsPillbox.propTypes = {
  /**
   * Id for the topics pillbox, since there may be more than one pillbox on a page.
   * Helps create unique keys for elements in each instance.
   */
  id: PropTypes.string.isRequired,

  /**
   * Topics map where key is the topic id, and each value is an object with
   * data for the topic. Currently expecting shape defined by the topics list
   * endpoint, e.g.
   *
   * ```
   * {
   *   business: {
   *     curator_label: 'Business',
   *     display_name: 'Business',
   *     is_promoted: false,
   *     page_type: 'topic_page',
   *     topic: 'business',
   *     topic_slug: 'business'
   *   }
   * }
   * ```
   *
   * Topics that have `is_promoted` as true will be placed at the front of the list.
   */
  topicsMap: PropTypes.object,

  /**
   * Text to display above the topics pills. Will be inserted into an <h3> level heading.
   */
  headingText: PropTypes.string,

  /**
   * CSS class to apply to the topics heading to override styles.
   */
  headingClassName: PropTypes.string,

  /**
   * Default is 'left' aligned. Change to 'center' to have all pills and header
   * be centered-aligned.
   */
  alignItems: PropTypes.oneOf(['left', 'center']),

  /**
   * Called when the user clicks on one of the topic pills. Passes the topic id,
   * topic index, and component id.x
   */
  onTopicClick: PropTypes.func
}

export default TopicsPillbox
