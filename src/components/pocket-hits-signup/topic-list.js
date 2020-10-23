import PropTypes from 'prop-types'
import { css } from 'linaria'
import classnames from 'classnames'

const topicList = css`
  padding: 0;
  margin: 0 0 var(--spacing400) 0;

  &.visible-top-border:before {
    content: '';
    background-color: var(--color-amber);
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 741 8' height='8' width='741'><defs/><path fill='%231CB0A8' d='M156.582 8H-55.989L-56 0h219.775l-7.193 8z'/><path fill='%23EF4056' d='M164.39 0l-11.5 8h219.887V0'/><path fill='%231CB0A8' d='M509.209 8H372.777V0h132.036l4.396 8z'/><path fill='%2395D5D2' d='M161.598 0h25.4l6.894 8H152.89l8.708-8z'/><path fill='%23FCB643' d='M860 8H509.381L497 0h363v8z'/></svg>");
    background-repeat: no-repeat;
    width: 100%;
    display: block;
    height: var(--size050);
    margin: 0 0 var(--spacing100) 0;
  }

  li {
    display: inline-block;
    font-family: var(--fontSerifAlt);
    font-weight: normal;
    font-size: var(--fontSize125);
    line-height: 1.2em;
    margin: 0 var(--spacing050) 0 0;
    &:after {
      content: '•';
      margin: 0 0 0 var(--spacing050);
    }
    &:last-of-type:after {
      content: '';
    }
  }
`
/**
 * Renders a list of story topics (article categories) to peak interest
 */
function TopicList({ topics, showTopBorder }) {
  return (
    <ul
      className={classnames(topicList, {
        'visible-top-border': showTopBorder
      })}>
      {topics.map((topic) => (
        <li key={`topic-list-${topic}`}>{topic}</li>
      ))}
    </ul>
  )
}

TopicList.propTypes = {
  /**
   * Array of objects with path to image and name of publisher
   */
  topics: PropTypes.array.isRequired,

  /**
   * Set to false to hide the top border
   */
  showTopBorder: PropTypes.bool
}

TopicList.defaultProps = {
  showTopBorder: true
}

export default TopicList
